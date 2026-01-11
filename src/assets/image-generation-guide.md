# Image Generation Guide for Blog Posts

## Aspect Ratio Requirements

When generating thumbnail images for blog posts, use the following specifications:

### Recommended Aspect Ratio
- **Aspect Ratio**: 16:9 (Landscape)
- **Recommended Dimensions**: 1200x675px or 1600x900px
- **Maximum Height**: 400px (as constrained by the layout)

### Alternative Ratios
If 16:9 doesn't fit your content, these ratios also work well:
- **2:1**: 1200x600px (wider panoramic view)
- **3:2**: 1200x800px (slightly taller, more balanced)

### Technical Constraints
- The layout sets `max-height: 400px` with `object-fit: cover`
- Images wider than the aspect ratio will be cropped on the sides
- Images taller than the aspect ratio will be cropped on top/bottom
- Full width is always used within the container

### Best Practices
1. **Keep important content centered** - edges may be cropped depending on viewport
2. **Avoid text near edges** - ensure readability across different screen sizes
3. **Use high resolution** - minimum 1200px width for crisp display on retina screens
4. **Optimize file size** - compress images to keep page load times fast (aim for < 200KB)
5. **Format**: PNG

### Content
Content just in the center of the image. Try to use 2D style. Don't use words in the image.

{ "action": "dalle.text2im", "action_input": "{ "prompt": "A clean, 2D flat vector illustration centered in the frame. The design features a stylized data pipeline represented by flowing lines or a conveyor belt. In the center, a magnifying glass or a checklist icon is inspecting data nodes (circles or cubes) to represent quality checks. Use a professional color palette of blues, teals, and grays against a solid light background. All important elements are concentrated in the middle to ensure they aren't cropped. 16:9 aspect ratio, high resolution, minimalist 2D style.", "aspect_ratio": "16:9" }", "thought": "I will generate a 16:9 2D vector-style image centered on the theme of 'data quality checks in a data pipeline' as requested by the user's guide." }

### File Naming Convention
```
/src/assets/[post-slug]/thumb.png
```

Example:
```
/src/assets/implementing_data_quality_checks_in_data_pipelines/thumb.png
```

## Image Layout Behavior

The post layout displays images with:
- Full width of the container (max-width: 1000px)
- Maximum height of 400px
- Rounded corners (6px border-radius)
- Object-fit: cover (maintains aspect ratio, crops if needed)
- 6rem margin below the image
- 7rem margin above the image (after post meta)

## Usage in Frontmatter

Add the image to your post's frontmatter like this:

```yaml
---
title: "Your Post Title"
author: "Your Name"
pubDate: 2024-01-15
description: "Post description"
image:
  url: "/src/assets/your-post-slug/thumb.png"
  alt: "Descriptive alt text for accessibility"
tags: ["tag1", "tag2"]
---
```
