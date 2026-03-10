# Translate Post PT-BR → EN Skill

## Description
Translates an existing Brazilian Portuguese blog post to English, preserving the exact same structure, images, tags, and code examples.

## Trigger
User asks to translate a post from Portuguese to English, or references this skill.

## Instructions

### 1. Read the Source Post
Read the original Portuguese post from:
`/home/robert/Desktop/personal-blog/blog/src/content/posts/pt-br/{post-slug}.md`

### 2. Create the Translated Post
Create the translated file at:
`/home/robert/Desktop/personal-blog/blog/src/content/posts/en/{post-slug}.md`

The filename (slug) MUST remain exactly the same as the Portuguese version.

### 3. Translation Rules

#### Frontmatter
- **title:** Translate to English
- **pubDate:** Keep the same date
- **description:** Translate to English
- **author:** Keep as `Robert Gleison`
- **image:** Keep the EXACT same `url` and `alt` values — images are shared across locales in `/public/{post-slug}/`
- **tags:** Keep the EXACT same tags array — the system translates tags automatically via `translateTag()`

#### Content Structure
- Keep the EXACT same section structure (same number of sections, same hierarchy, same order)
- Keep the EXACT same heading levels (`##`, `###`, `####`)
- Translate the table of contents section. Rename `## Índice` to `## Table of Contents` and update anchor links to match the translated heading text
- Keep `<br>` tags and `---` separators in the same positions

#### Images
- Keep ALL image references exactly as they are: `![alt](/post-slug/image.png)`
- Do NOT change image paths — both locales share the same `/public/` directory
- Keep `<!-- TODO: add image -->` placeholders if present

#### Code Examples
- Keep code blocks exactly as they are (same language, same code)
- Translate code comments to English ONLY if the original has comments
- Do NOT add new comments that don't exist in the original
- Keep the same code annotation style as the original

#### Text Translation
- Use natural, conversational English — not overly formal or academic
- If the original uses Brazilian idioms, slang, or regional sayings, use an equivalent English expression with the same meaning rather than a literal translation
- Maintain the same tone — if the original is opinionated, keep the opinion. If it's casual, stay casual
- Technical terms that were already in English in the Portuguese version should remain the same
- Do NOT add or remove content — the translated post should have the same information density as the original
- Keep the same formatting: bold, italic, inline code, blockquotes

#### References
- Rename `## Referências` to `## References`
- Keep the exact same links
- Do NOT translate link titles unless equivalent English resources exist

### 4. After Translation
- Confirm the translated file was created with its path
- Note any idioms or slang that were adapted rather than literally translated
- Remind the user to review the translation for personal voice adjustments
