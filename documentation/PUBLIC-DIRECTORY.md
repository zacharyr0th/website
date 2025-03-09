# Public Folder Documentation

## Overview

The `public` folder contains static assets and resources that are directly accessible by the browser without being processed by the build system. These files are served as-is from the root path of the website.

## Directory Structure

```
public/
├── manifest.json
├── articles/
├── images/
├── reviews/
├── misc/
├── logos/
└── assets/
    ├── icons/
    └── screenshots/
```

## Key Files

### manifest.json

This file is a Web App Manifest that provides metadata about the website when installed as a Progressive Web App (PWA). It includes:

- Basic information: name, short name, description
- PWA configuration: icons, theme colors, display modes
- Navigation shortcuts
- Screenshots for app stores
- Protocol handlers and file handlers
- Widget definitions

The manifest enables the website to be installed on devices and provides an app-like experience.

## Directories

### articles/

Contains Markdown (.md) files for blog posts and articles published on the website. Each file represents a single article with its content and metadata. Topics include:

- Blockchain and cryptocurrency (digital gold, self-custody, etc.)
- Web development history (Web 1.0, Web 2.0, Web 3.0)
- Technical guides and tutorials
- Financial technology concepts

An `index.json` file serves as a catalog of all articles.

### images/

Contains image assets used throughout the website, primarily in WebP and AVIF formats for optimal performance. 

Images are related to:
- Article illustrations and diagrams
- Project screenshots
- Technical concepts visualization
- Cryptocurrency and blockchain imagery

### assets/

Contains organized subfolders for specific types of assets:

- **icons/**: App icons in various sizes for different platforms and purposes (favicon, app icons, etc.)
- **screenshots/**: Website screenshots used in the manifest.json

### Other Directories

- **reviews/**: Vontains user or product reviews
- **misc/**: Miscellaneous files that don't fit other categories
- **logos/**: Logo files for the website and partner organizations

## Usage Guidelines

1. **Adding New Files**: Place static assets that don't need processing in the appropriate subdirectory.
2. **File Formats**: Use optimized formats (WebP/AVIF for images) when possible for better performance.
3. **Organization**: Maintain the directory structure when adding new files.
4. **Referencing**: Reference files using absolute paths from the root (e.g., `/images/example.webp`).

## Best Practices

1. **Image Optimization**: All images should be optimized for web use to minimize load times.
2. **File Naming**: Use descriptive, kebab-case names for files (e.g., `article-header.webp`).
3. **Accessibility**: Ensure all content files include proper accessibility considerations.

## Notes

- The public folder is directly exposed to the web, so avoid placing sensitive information here.
- Files in this directory take precedence over similarly named files in the build output.
