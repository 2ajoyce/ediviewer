# EDI Viewer

## Deployment

### Automated Deployment (Recommended)

The project is configured with GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `master` branch.

The workflow can also be triggered manually from the Actions tab in GitHub.

### Manual Deployment

To manually push to Github Pages:
1) `ng build --prod --base-href "https://2ajoyce.github.io/ediviewer/"`
2) `npx ngh --dir=dist/edi`

