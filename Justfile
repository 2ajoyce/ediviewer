# Serve the static app at http://localhost:45678
# No build step — edits to index.html/app.js/css/*.css are picked up on refresh,
# no restart needed.
serve:
    node tests/e2e/serve.js

test:
    npm test

test-e2e:
    npx playwright test
