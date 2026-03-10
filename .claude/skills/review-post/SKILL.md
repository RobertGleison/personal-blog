# Review Post Skill

## Description
Reviews an existing blog post and suggests improvements, missing sections, or structural issues. After the user agrees with the suggestions, applies the changes following the writing rules from `create-post-template/SKILL.md`.

## Trigger
User asks to review a blog post, improve a post, or check a post for missing parts.

## Instructions

When the user asks to review a post, follow these steps:

### 1. Identify the Post
- If the user provides a file path, read that file directly
- If the user gives a post name/slug, look for it in `/home/robert/Desktop/personal-blog/blog/src/content/posts/pt-br/` or the `en/` equivalent
- If ambiguous, ask the user which post to review

### 2. Read and Analyze the Post
Read the full post and evaluate it against these criteria:

#### Structure Checklist
- [ ] Has proper frontmatter (title, pubDate, description, author, image, tags)
- [ ] Has a `## Índice` (or `## Index` for EN posts) with working anchor links
- [ ] Has a `## Overview` section with context and motivation
- [ ] Has a `## Referências` (or `## References`) section with real links
- [ ] Uses `---` separator after the table of contents
- [ ] Section hierarchy makes sense (`##` → `###` → `####`)

#### Content Checklist
- [ ] Overview sets real-world context or personal motivation (not generic intro)
- [ ] Includes practical code examples (at least 2-3 when the topic allows)
- [ ] Code comments are minimal — only where logic is genuinely hard to follow
- [ ] Shows trade-offs or comparisons where relevant (tables, pros/cons)
- [ ] Has "how to implement" content, not just theory
- [ ] Anticipates reader follow-up questions
- [ ] Uses diagrams (mermaid or tables) where visuals would help understanding

#### Writing Style Checklist
- [ ] Written in the correct language (pt-br or en) consistently
- [ ] Tone is technical but opinionated — expresses preferences, calls out bad practices
- [ ] Uses first person for opinions naturally ("Na minha opinião...", "O que eu prefiro...")
- [ ] No AI language patterns ("Vamos explorar...", "Neste artigo, vamos...", "É importante notar que...", "Let's dive into...", "In this article, we will...")
- [ ] Uses `**bold**` for key concepts on first introduction
- [ ] Uses `<br>` between major sections for breathing room where appropriate
- [ ] References section has real, relevant links (not placeholder URLs)

#### Tags Check
- Verify tags match existing ones: `Tips`, `Data Engineering`, `DevOps`, `Software Engineering`
- Flag any new tags that could use an existing one instead

### 3. Present the Review
Present your findings as a clear, prioritized list:

**Format:**
```
## Review: {post title}

### Missing / Incomplete
- (things that are absent and should be added)

### Suggestions for Improvement
- (things that exist but could be better)

### Minor Issues
- (small fixes: typos, formatting, broken links)

### What's Good
- (briefly note what already works well)
```

Be specific in every suggestion. Don't say "add more code examples" — say "the section about X would benefit from a code example showing Y". Don't say "improve the overview" — say what's missing from it.

### 4. Wait for User Approval
After presenting the review, ask the user which suggestions they want applied. Do NOT edit the file until the user confirms.

The user may:
- Accept all suggestions
- Pick specific suggestions to apply
- Reject suggestions and explain why
- Ask for clarification on a suggestion

### 5. Apply Changes
Once the user approves, edit the post following the writing rules from `create-post-template/SKILL.md`:

- Maintain the same language as the original post
- Follow the writing style rules (tone, no AI patterns, minimal code comments, etc.)
- Keep the author's existing voice and opinions — enhance, don't overwrite
- When adding new sections or content, write substantive text, not placeholders
- Preserve any content the user wrote manually — do not remove or rewrite parts that weren't flagged in the review

### 6. After Applying Changes
- Summarize what was changed
- List any remaining TODOs (e.g., images to add, links to verify)
- If new sections were added, suggest updating the `## Índice` accordingly

## Example Usage

User: "Review my post about deployment strategies"

The skill would:
1. Read `/home/robert/Desktop/personal-blog/blog/src/content/posts/pt-br/deployment-strategies.md`
2. Analyze structure, content, and style against the checklists
3. Present findings like:
   - "Missing: no `## Referências` section — should add links to the Kubernetes docs and the Martin Fowler article on deployment patterns"
   - "Suggestion: the Blue-Green section explains the concept but has no code example. A Docker Compose or k8s manifest showing the switchover would make it concrete"
   - "Minor: the Índice link for `#canary-deployment` doesn't match the actual heading `#canary-releases`"
4. Wait for user to say which changes to apply
5. Edit the file with approved changes
