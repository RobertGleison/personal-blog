# Translate Post EN → PT-BR Skill

## Description
Translates an existing English blog post to Brazilian Portuguese, preserving the exact same structure, images, tags, and code examples.

## Trigger
User asks to translate a post from English to Portuguese, or references this skill.

## Instructions

### 1. Read the Source Post
Read the original English post from:
`/home/robert/Desktop/personal-blog/blog/src/content/posts/en/{post-slug}.md`

### 2. Create the Translated Post
Create the translated file at:
`/home/robert/Desktop/personal-blog/blog/src/content/posts/pt-br/{post-slug}.md`

The filename (slug) MUST remain exactly the same as the English version.

### 3. Translation Rules

#### Frontmatter
- **title:** Translate to Brazilian Portuguese
- **pubDate:** Keep the same date
- **description:** Translate to Brazilian Portuguese
- **author:** Keep as `Robert Gleison`
- **image:** Keep the EXACT same `url` and `alt` values — images are shared across locales in `/public/{post-slug}/`
- **tags:** Keep the EXACT same tags array — the system translates tags automatically via `translateTag()`

#### Content Structure
- Keep the EXACT same section structure (same number of sections, same hierarchy, same order)
- Keep the EXACT same heading levels (`##`, `###`, `####`)
- Translate the `## Índice` anchor links to match the translated heading text
- Keep `<br>` tags and `---` separators in the same positions

#### Images
- Keep ALL image references exactly as they are: `![alt](/post-slug/image.png)`
- Do NOT change image paths — both locales share the same `/public/` directory
- Keep `<!-- TODO: add image -->` placeholders if present

#### Code Examples
- Keep code blocks exactly as they are (same language, same code)
- Translate code comments to Portuguese ONLY if the original has comments
- Do NOT add new comments that don't exist in the original
- Keep the same code annotation style as the original

#### Text Translation
- Use natural Brazilian Portuguese — not formal/literary Portuguese
- If the original uses idioms, slang, or regional sayings, use an equivalent Brazilian Portuguese expression with the same meaning rather than a literal translation
- Maintain the same tone — if the original is opinionated, keep the opinion. If it's casual, stay casual
- Keep technical terms in English when that's the standard in Brazilian tech (e.g., "deploy", "cache", "rollback", "feature flag", "load balancer")
- Do NOT add or remove content — the translated post should have the same information density as the original
- Keep the same formatting: bold, italic, inline code, blockquotes

#### References
- Keep the `## Referências` section with the exact same links
- Do NOT translate link titles unless they point to Portuguese resources

### 4. After Translation
- Confirm the translated file was created with its path
- Note any idioms or slang that were adapted rather than literally translated
- Remind the user to review the translation for personal voice adjustments
