# EDI Viewer

A dependency-free static web app for viewing and parsing EDI (Electronic Data Interchange) files with drag-and-drop functionality.

## Getting Started

### Demo

You can view the latest release at [https://2ajoyce.github.io/ediviewer/](https://2ajoyce.github.io/ediviewer/).

### Usage

1. Open the application in your web browser at the demo URL above.
2. Drag and drop an EDI file (e.g., .850 file) onto the page, or click "Load Sample Data" to see it work with a sample purchase order.
3. View the structured content with segment delimiters, element delimiters, and component separators clearly displayed.

The application parses EDI files client-side, so your data never leaves your browser.

## Development

This is a plain HTML/CSS/JavaScript app — no build step, no framework, no bundler. `index.html`, `css/*.css`, and `app.js` are served as-is.

Styles in `css/` are split to mirror [css-base](https://github.com/2ajoyce/css-base): `reset.css`, `themes.css`, `elements.css`, `layout.css`, `buttons.css`, and `components.css` are trimmed subsets of the matching css-base files, and `custom.css` holds everything specific to this app. `src/toast.js` is a vendored copy of css-base's `toast.js`, converted to an ES module.

To run it locally:

```bash
npm install
npm run serve
```

Then open `http://localhost:4300`.

### Tests

```bash
npm test        # unit tests for the parser (node:test)
npm run test:e2e  # Playwright end-to-end tests
```

### Deployment

The project is configured with GitHub Actions to automatically deploy the static files to GitHub Pages when changes are pushed to the `master` branch. The workflow can also be triggered manually from the Actions tab in GitHub.
