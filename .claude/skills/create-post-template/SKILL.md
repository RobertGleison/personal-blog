# Create Post Template Skill

## Description
Creates a blog post draft with structured topics, code examples, and opinionated technical content. The user provides a theme/topic and the skill generates a complete post skeleton ready to be reviewed and overwritten with the user's own ideas.

## Trigger
User asks to create a new blog post, write a post template, or draft a post about a topic.

## Instructions

When the user asks to create a new post, follow these steps:

### 1. Research the Topic
Before writing, research the topic to identify the most relevant subtopics, practical use cases, and common patterns. The post should NOT just explain what something is — it should show HOW it's done with real code examples and practical demonstrations.

### 2. Check Existing Tags
Read existing posts to reuse tags when possible. Current tags in use:
- `Tips`
- `Data Engineering`
- `DevOps`
- `Software Engineering`

Only create a new tag if the topic genuinely doesn't fit any existing tag.

### 3. Create the Post File

**File location:** `/home/robert/Desktop/personal-blog/blog/src/content/posts/pt-br/{post-slug}.md`

Use kebab-case for the filename (e.g., `kubernetes-networking.md`).

**Create the image directory:** `/home/robert/Desktop/personal-blog/blog/public/{post-slug}/`

### 4. Post Structure

Every post MUST follow this exact structure:

```markdown
---
title: 'Título do Post'
pubDate: YYYY-MM-DD  (use today's date)
description: 'Uma descrição curta e direta do que o post aborda.'
author: 'Robert Gleison'
image:
  url: '/{post-slug}/thumb_{slug_short}.png'
  alt: 'Description of thumbnail'
tags: ["ExistingTag1", "ExistingTag2"]
---

## Índice

- [Overview](#overview)
- [Section 1](#section-1)
  - [Subsection 1.1](#subsection-11)
- [Section N](#section-n)
- [Referências](#referências)

---

## Overview
(Brief context about WHY this topic matters. Include a personal motivation or real-world situation that inspired the post. Keep it 2-4 paragraphs.)

## Main Sections
(Technical content with code examples, diagrams, and opinions)

## Referências

- [Source Title](URL)
```

### 5. Writing Style Rules

Follow these rules strictly:

- **Language:** Write in Brazilian Portuguese (pt-br), same as existing posts
- **Tone:** Technical but opinionated. Express what you think works best, share preferences, call out bad practices
- **Personal voice:** Write as if sharing knowledge from experience. Use first person when giving opinions ("Na minha opinião...", "O que eu prefiro fazer é...", "Já vi sistemas que...")
- **Code examples:** Include real, practical code snippets. These are essential — the post should SHOW how things are done, not just describe them
- **Code comments:** Minimal. Only add comments when the logic is genuinely hard to understand. Do NOT add obvious comments or explain every line. The code should speak for itself
- **No AI language patterns:** Avoid phrases like "Vamos explorar...", "Neste artigo, vamos...", "É importante notar que...". Write naturally and directly
- **Analogies:** Use analogies when they genuinely help explain complex concepts (like the bakery analogy in the deployment post)
- **Diagrams:** When a visual helps, use mermaid diagrams or markdown tables. Do NOT use ASCII art
- **Section depth:** Use `##` for main sections and `###` for subsections. Use `####` sparingly
- **Spacing:** Use `<br>` between major sections where extra breathing room helps readability
- **Bold:** Use `**text**` to highlight key concepts and terms on their first introduction
- **Images:** Add placeholder comments like `<!-- TODO: add image showing X -->` where images would help. The user will add real images during review
- **References:** Always end with a `## Referências` section with real, relevant links

### 6. Content Quality

- Each section should have substantive content, not just placeholders. Write real technical content that the user can then adjust
- Include at least 2-3 code examples per post (when the topic allows)
- Show trade-offs and comparisons when relevant (tables work great for this)
- Include practical "how to implement" sections, not just theory
- The overview should set context with a real-world scenario or personal motivation
- Anticipate follow-up questions the reader might have and address them

### 7. After Creating the Post

- Confirm the post was created with its file path
- List the sections/topics included so the user can review the structure
- Mention that image placeholders were added where relevant
- Remind the user to add a thumbnail image at `/{post-slug}/thumb_*.png`

## Example Usage

User: "Create a post about Redis caching strategies"

The skill would:
1. Create `/home/robert/Desktop/personal-blog/blog/src/content/posts/pt-br/redis-caching-strategies.md`
2. Create `/home/robert/Desktop/personal-blog/blog/public/redis-caching-strategies/` directory
3. Write a complete post with sections like: Overview, O que é Cache, Estratégias de Cache (Write-Through, Write-Behind, Cache-Aside), Implementação com Redis, Configurações Importantes, Cache Invalidation, Referências
4. Include Python/Node.js code examples showing real Redis usage
5. Use existing tags like `["DevOps", "Software Engineering"]`
