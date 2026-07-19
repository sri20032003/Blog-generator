/**
 * AI Prompts for Content Generation
 * Optimized for SEO, EEAT, and AI platform readability
 */

const generateBlogPrompt = (niche, keyword, newsContext, imageCount) => {
  return `You are an expert blog writer specializing in ${niche}. Create a comprehensive, SEO-optimized blog post.

**CRITICAL REQUIREMENTS:**
- ZERO fabricated statistics or data
- 2,500-5,000+ words minimum
- Proper heading hierarchy: H1, H2, H3 only
- Answer-first formatting
- Q&A sections where appropriate
- Flesch reading score: 60-70
- Keyword density: 1-2% naturally incorporated
- Every claim must be verifiable or clearly hypothetical
- Include freshness signals (references to 2024/2025)
- Optimize for both Google and AI platforms (ChatGPT, Perplexity)

**SEO REQUIREMENTS:**
- Focus keyword: "${keyword}"
- Include 15+ related long-tail keywords naturally
- Use semantic variations and synonyms
- Add internal linking suggestions [INTERNAL_LINK:anchor_text]
- Create content clusters

**STRUCTURE:**
Format as valid HTML with proper semantic tags. Output MUST be valid, well-formed HTML.

<article>
  <h1>Title (50-60 chars, keyword first)</h1>
  <meta name="description" content="Meta description (150-160 chars)">
  
  <section id="introduction">
    <h2>Introduction</h2>
    <p>Start with answer/value proposition...</p>
  </section>
  
  <section id="what-is">
    <h2>What is ${keyword}?</h2>
    <p>Clear definition and context...</p>
  </section>
  
  <section id="why-matters">
    <h2>Why ${keyword} Matters</h2>
    <p>Key benefits and significance...</p>
  </section>
  
  <section id="how-to">
    <h2>How to ${keyword}</h2>
    <h3>Step 1: Foundation</h3>
    <p>Detailed explanation...</p>
    <h3>Step 2: Implementation</h3>
    <p>Actionable guidance...</p>
  </section>
  
  <section id="best-practices">
    <h2>Best Practices for ${keyword}</h2>
    <ul>
      <li>Practice 1 with explanation</li>
      <li>Practice 2 with explanation</li>
    </ul>
  </section>
  
  <section id="common-mistakes">
    <h2>Common Mistakes to Avoid</h2>
    <p>Real pitfalls and how to avoid them...</p>
  </section>
  
  <section id="faq">
    <h2>Frequently Asked Questions</h2>
    <h3>Q: Common question about ${keyword}?</h3>
    <p>A: Detailed answer...</p>
  </section>
  
  <section id="conclusion">
    <h2>Conclusion</h2>
    <p>Summary and actionable next steps...</p>
  </section>
</article>

**IMAGE PLACEHOLDER FORMAT:**
Include exactly ${imageCount} image placeholders as:
<figure>
  <img src="[IMAGE_1]" alt="Descriptive alt text for image 1">
  <figcaption>Detailed caption explaining the image context</figcaption>
</figure>

**CONTENT QUALITY CHECKLIST:**
✓ All claims are verifiable or clearly marked as hypothetical
✓ Includes recent examples and references (2024/2025)
✓ Uses data from credible sources or removes specific numbers
✓ Addresses user intent and search queries
✓ Includes actionable takeaways
✓ Natural keyword integration
✓ Clear heading hierarchy
✓ Readable paragraphs (2-3 sentences average)
✓ Includes transition words and phrases
✓ Proper spelling and grammar

**NEWS CONTEXT (use for freshness):**
${newsContext || 'No recent news available'}

Now write the complete blog post in HTML format with all requirements met.`;
};

const generateImagePrompt = (niche, topic, imageIndex) => {
  const prompts = {
    cryptocurrency: [
      `Professional illustration of bitcoin and blockchain technology | Modern digital art style | Financial technology workspace | Bright LED lighting | Wide composition showing circuit patterns and crypto symbols | Professional, trustworthy mood | Suitable for blog header | No text overlays | Metallic and neon materials | Clean, minimal layout | Reverse prompt: avoid cartoonish or unprofessional appearance | Image-to-image: enhance color saturation and clarity | Template: cryptocurrency and finance | Parameters: 1200x630px, 16:9 aspect ratio | Category: Finance & Technology`,
      `Ethereum blockchain network visualization | 3D technical illustration | Data center environment | Cool blue and purple lighting | Network nodes and connections | Tech-forward, innovative mood | Blog thumbnail friendly | Transparent background | Glass and digital materials | Symmetrical composition | Reverse prompt: avoid cluttered or unclear visuals | Image-to-image: sharpen network lines and enhance depth | Template: blockchain technology | Parameters: 1200x630px | Category: Technology`,
      `Crypto trading dashboard screenshot mockup | Dark mode interface design | Multiple charts and data points | Ambient professional lighting | Focus on analytical layout | Data-driven, serious mood | High resolution suitable for guides | Minimal decorative elements | Digital and UI components | Organized information hierarchy | Reverse prompt: no cartoon elements | Image-to-image: increase contrast and readability | Template: trading platform | Parameters: 1200x630px | Category: Finance`
    ],
    artificial_intelligence: [
      `AI neural network visualization with interconnected nodes | Digital illustration style | Laboratory or tech workspace | Ambient scientific lighting | Complex but clear network structure | Innovative, futuristic mood | Professional quality for articles | Minimal text | Digital elements and circuits | Centered symmetrical layout | Reverse prompt: avoid sci-fi over-the-top appearance | Image-to-image: enhance glow effects and clarity | Template: AI and machine learning | Parameters: 1200x630px | Category: Technology`,
      `Humanoid robot hand with AI concept | 3D rendering style | Clean white or grey background | Professional studio lighting | Focus on precision and detail | Advanced, sophisticated mood | Suitable for blog hero images | No text watermarks | Metallic and synthetic materials | Isolated focal point | Reverse prompt: avoid cartoonish design | Image-to-image: enhance metallic finish and reflections | Template: artificial intelligence | Parameters: 1200x630px | Category: Technology`,
      `Data science workspace with AI tools displayed | Professional office environment | Multiple screens showing analytics | Warm professional lighting | Collaborative workspace aesthetic | Expert, modern mood | High quality for featured images | Readable UI elements | Tech equipment and computers | Depth of field composition | Reverse prompt: no cluttered mess | Image-to-image: improve lighting and clarity | Template: data science | Parameters: 1200x630px | Category: Technology`
    ],
    cybersecurity: [
      `Digital shield protecting data with lock symbols | Modern vector or illustration style | Dark secure environment | Blue and green security lighting | Layered protective elements | Secure, trustworthy mood | Professional security-focused design | Minimal text | Digital security elements | Centered composition | Reverse prompt: avoid scary or threatening imagery | Image-to-image: enhance shield details and color pop | Template: cybersecurity | Parameters: 1200x630px | Category: Security`,
      `Hacker prevention concept with blocked breach attempts | 3D illustration style | Secure facility environment | Red warning and green protection lighting | Dynamic defensive composition | Alert but controlled mood | Suitable for security articles | No explicit hacking visuals | Digital barriers and firewalls | Balanced composition | Reverse prompt: no glorifying hacking | Image-to-image: increase contrast between threat and protection | Template: cyber defense | Parameters: 1200x630px | Category: Security`,
      `Padlock and encryption concept visualization | Minimalist design style | Technology background | Cool secure lighting | Symmetrical protection elements | Professional and serious mood | Clean design for guides | No scary elements | Metallic and digital components | Central focal point | Reverse prompt: keep it professional not alarming | Image-to-image: enhance lock details and background | Template: encryption security | Parameters: 1200x630px | Category: Security`
    ],
    personal_finance: [
      `Personal finance dashboard or budget planning visual | Clean infographic style | Home office or workspace | Warm professional lighting | Charts and financial data visualization | Organized, positive mood | Motivational for finance articles | Clear readable elements | Paper, charts, calculator elements | Well-structured layout | Reverse prompt: avoid cluttered complexity | Image-to-image: improve chart clarity and colors | Template: financial planning | Parameters: 1200x630px | Category: Finance`,
      `Piggy bank or savings growth concept | 3D illustration or photo realistic | Neutral or warm background | Even professional lighting | Focus on accumulation and growth | Positive, encouraging mood | Accessible for general audience | Minimal text | Objects and coins | Isolated focal point | Reverse prompt: no cartoonish piggy banks | Image-to-image: enhance savings visual and coins | Template: savings | Parameters: 1200x630px | Category: Finance`,
      `Investment portfolio diversification concept | Multiple asset classes visualized | Professional financial environment | Balanced lighting | Varied but organized elements | Sophisticated, balanced mood | Professional resource for articles | Technical elements visible | Charts, stocks, bonds, real estate | Comprehensive composition | Reverse prompt: no overly complex visuals | Image-to-image: clarify each asset class | Template: investment portfolio | Parameters: 1200x630px | Category: Finance`
    ]
  };

  const nichePrompts = prompts[niche] || prompts.personal_finance;
  const selectedPrompt = nichePrompts[imageIndex % nichePrompts.length];
  return selectedPrompt || nichePrompts[0];
};

const generateSchemaPrompt = (niche, title, author, datePublished) => {
  return `Generate JSON-LD structured data for a comprehensive blog article about ${niche}.

Return ONLY valid JSON (no markdown, no code blocks).

Requirements:
1. Article Schema with all required fields
2. Author schema with organization
3. FAQPage schema if applicable
4. BreadcrumbList schema
5. All dates in ISO 8601 format
6. Include full schema context

Data to include:
- Title: ${title}
- Author: ${author || 'Blog Generator'}
- Date Published: ${datePublished || new Date().toISOString()}
- Image: [IMAGE_URL_1], [IMAGE_URL_2], etc.
- Keywords: [15+ relevant keywords]

Return the complete, valid JSON-LD structure ready to use in HTML <script type="application/ld+json"> tags.`;
};

module.exports = {
  generateBlogPrompt,
  generateImagePrompt,
  generateSchemaPrompt
};
