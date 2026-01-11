# EDI Viewer

An Angular application for viewing and parsing EDI (Electronic Data Interchange) files with drag-and-drop functionality.

## Getting Started

### Demo

You can view the latest release at [https://2ajoyce.github.io/ediviewer/](https://2ajoyce.github.io/ediviewer/).

### Usage

1. Open the application in your web browser at the demo URL above.
2. Drag and drop an EDI file (e.g., .850 file) onto the page.
3. View the structured content with segment delimiters, element delimiters, and component separators clearly displayed.

The application parses EDI files client-side, so your data never leaves your browser.

## Development

This is an Angular 20 application using TypeScript and SCSS.

### Build

To build the project for production:

```bash
npm run build-prod
```

This will generate optimized files in the `dist/edi` directory.

### Deployment

The project is configured with GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `master` branch. The workflow can also be triggered manually from the Actions tab in GitHub.

To manually deploy to GitHub Pages:

```bash
npm run deploy-prod
```

