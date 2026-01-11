# Personal Blog
This is my personal blog where I keep my articles. You can visit it in [robertech.dev](https://robertech.dev/)

## Commands

All commands are run from the root of the project:

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview build locally before deploying |
| `pnpm astro ...` | Run Astro CLI commands |

Note: you need to have Node installed
## Creating Blog Posts

Blog posts are written in Markdown and stored in the [src/pages/posts/](src/pages/posts/) directory.

### Step 1: Create a New Markdown File

Create a new `.md` file in [src/pages/posts/](src/pages/posts/) with a descriptive filename:

```bash
src/pages/posts/my-new-post.md
```

### Step 2: Add Frontmatter

Every post must include frontmatter at the top with the following fields:

```markdown
---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Your Post Title'
pubDate: 2024-01-15
description: 'A brief description of your post for SEO and previews'
author: 'Your Name'
image:
    url: 'https://example.com/image.jpg'
    alt: 'Description of the image'
tags: ["tag1", "tag2", "tag3"]
---
```

### Frontmatter Fields Explained

- **layout** (required): Must be `../../layouts/MarkdownPostLayout.astro`
- **title** (required): The post title displayed on cards and the post page
- **pubDate** (required): Publication date in YYYY-MM-DD format
- **description** (required): Brief summary for SEO and post cards
- **author** (optional): Author name
- **image** (optional): Featured image with `url` and `alt` text
- **tags** (required): Array of tags for categorization and filtering

### Step 3: Write Your Content
Just write the content


## Tools Used
- Carbon: images of your source code
- Gemini: images for post thumbnails
- Draw.io: handmade fluxograms