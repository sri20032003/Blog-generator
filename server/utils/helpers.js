/**
 * Helper Functions for Blog Generation
 */

const slugify = require('slugify');

const generateSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true
  });
};

const generateMetaDescription = (content, maxLength = 160) => {
  // Extract first meaningful paragraph
  const paragraphMatch = content.match(/<p>([^<]+)<\/p>/);
  const text = paragraphMatch ? paragraphMatch[1] : content;
  
  // Clean HTML tags if any remain
  const cleanText = text.replace(/<[^>]+>/g, '').trim();
  
  // Truncate and ensure it ends with proper punctuation
  let description = cleanText.substring(0, maxLength);
  if (description.length === maxLength && !description.endsWith('.')) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
};

const calculateFleschScore = (text) => {
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]+>/g, '');
  
  // Count sentences (rough estimate)
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  // Count words
  const words = cleanText.split(/\s+/).filter(w => w.length > 0).length;
  
  // Count syllables (simplified)
  const syllables = cleanText
    .split(/\s+/)
    .reduce((count, word) => {
      return count + countSyllables(word);
    }, 0);
  
  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.round(Math.max(0, Math.min(100, score)));
};

const countSyllables = (word) => {
  word = word.toLowerCase();
  let count = 0;
  let previousWasVowel = false;
  
  for (let i = 0; i < word.length; i++) {
    const isVowel = 'aeiouy'.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      count++;
    }
    previousWasVowel = isVowel;
  }
  
  // Adjust for silent e
  if (word.endsWith('e')) {
    count--;
  }
  
  // Words have at least one syllable
  return Math.max(1, count);
};

const calculateKeywordDensity = (text, keyword) => {
  const cleanText = text.replace(/<[^>]+>/g, '').toLowerCase();
  const words = cleanText.split(/\s+/).length;
  
  const keywordRegex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\b`, 'gi');
  const matches = cleanText.match(keywordRegex) || [];
  
  const density = (matches.length / words) * 100;
  return parseFloat(density.toFixed(2));
};

const extractHeadings = (htmlContent) => {
  const headings = [];
  const headingRegex = /<h([1-6])>([^<]+)<\/h\1>/g;
  let match;
  
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      text: match[2],
      id: generateSlug(match[2])
    });
  }
  
  return headings;
};

const validateHeadingHierarchy = (headings) => {
  if (headings.length === 0) return { valid: true, issues: [] };
  
  const issues = [];
  let lastLevel = 1;
  
  for (const heading of headings) {
    // Check for gaps in heading hierarchy
    if (heading.level > lastLevel + 1) {
      issues.push(`Heading hierarchy gap: jumped from H${lastLevel} to H${heading.level}`);
    }
    lastLevel = heading.level;
  }
  
  // Check that first heading is H1
  if (headings[0].level !== 1) {
    issues.push('First heading should be H1');
  }
  
  // Check for multiple H1s
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count > 1) {
    issues.push(`Multiple H1 headings found (${h1Count}). Should have exactly one.`);
  }
  
  return {
    valid: issues.length === 0,
    issues,
    headingCount: headings.length
  };
};

const generateTableOfContents = (headings) => {
  let toc = '<nav class="table-of-contents">\n<h2>Table of Contents</h2>\n<ol>\n';
  
  headings.forEach(heading => {
    if (heading.level > 1) { // Skip H1
      const indent = '  '.repeat(heading.level - 2);
      toc += `${indent}<li><a href="#${heading.id}">${heading.text}</a></li>\n`;
    }
  });
  
  toc += '</ol>\n</nav>\n';
  return toc;
};

const extractImageAltTexts = (htmlContent) => {
  const images = [];
  const imgRegex = /<img[^>]+alt="([^"]*)"/g;
  let match;
  
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    images.push({
      alt: match[1],
      hasAlt: match[1].length > 0
    });
  }
  
  return images;
};

const generateOpenGraphTags = (title, description, image, url) => {
  return {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:type': 'article',
    'og:url': url,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image
  };
};

const generateCanonicalUrl = (baseUrl, slug) => {
  return `${baseUrl.replace(/\/$/, '')}/blog/${slug}/`;
};

const validateNoFabrication = (text) => {
  // List of suspicious patterns that might indicate fabricated statistics
  const suspiciousPatterns = [
    /\d+%\s+(?:of|increase|decrease|growth)/gi,
    /\$\d+(?:\s+(?:billion|million|thousand))?/g,
    /over\s+\d+\s+(?:million|billion|thousand)/gi,
    /research\s+shows/gi,
    /studies\s+(?:prove|show)/gi,
    /according\s+to\s+(?:our|a)\s+study/gi
  ];
  
  const cleanText = text.replace(/<[^>]+>/g, '');
  const issues = [];
  
  for (const pattern of suspiciousPatterns) {
    const matches = cleanText.match(pattern);
    if (matches) {
      issues.push({
        pattern: pattern.toString(),
        matches,
        suggestion: 'Verify this statistic or add source attribution'
      });
    }
  }
  
  return {
    needsVerification: issues.length > 0,
    issues
  };
};

module.exports = {
  generateSlug,
  generateMetaDescription,
  calculateFleschScore,
  countSyllables,
  calculateKeywordDensity,
  extractHeadings,
  validateHeadingHierarchy,
  generateTableOfContents,
  extractImageAltTexts,
  generateOpenGraphTags,
  generateCanonicalUrl,
  validateNoFabrication
};
