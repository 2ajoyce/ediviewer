# Copilot Instructions for EDI Viewer

## Project Overview

This is an Angular application for viewing and parsing EDI (Electronic Data Interchange) files. The application allows users to drag and drop EDI files (e.g., .850 files) to view their structured content with segment delimiters, element delimiters, and component separators clearly displayed.

## Technology Stack

- **Framework**: Angular 13
- **State Management**: NgRx Store
- **Language**: TypeScript 4.5.4
- **Styling**: SCSS
- **Testing**: Jasmine and Karma
- **E2E Testing**: Protractor
- **Linting**: TSLint

## Code Style Guidelines

### TypeScript

- Use single quotes for strings (enforced by TSLint)
- Always use semicolons (enforced by TSLint)
- Maximum line length: 140 characters
- Use spaces for indentation (not tabs)
- Prefer `const` over `let` when variables are not reassigned
- No usage of `var` keyword
- Use arrow functions where appropriate
- Follow member ordering: static fields, instance fields, static methods, instance methods

### Angular Specific

- Component class names must have the `Component` suffix
- Directive class names must have the `Directive` suffix
- Use the `app` prefix for all custom components and directives
- Use lifecycle interfaces (e.g., `implements OnInit`)
- Use pipe transform interface for custom pipes
- Use Angular's `@Input()` and `@Output()` decorators properly
- No renaming of `@Input()` or `@Output()` properties

### Console Usage

- Avoid using `console.debug`, `console.info`, `console.time`, `console.timeEnd`, and `console.trace`
- `console.log`, `console.warn`, and `console.error` are allowed

### File Organization

- Components should be in `src/app/components/`
- Directives should be in `src/app/directives/`
- Services should be in `src/app/services/`
- Models should be in `src/app/models/`
- Pipes should be in `src/app/pipes/`
- State management files (actions, reducers) should be at `src/app/`

## Testing Requirements

### Unit Tests

- All components, directives, pipes, and services must have corresponding `.spec.ts` test files
- Use Jasmine testing framework
- Tests should be located alongside their implementation files
- Follow existing test patterns in the repository
- Run tests using: `ng test`

### Test Configuration

- Karma is configured in `src/karma.conf.js`
- E2E tests use Protractor (configured in `e2e/protractor.conf.js`)
- E2E test files should have `.e2e-spec.ts` extension

## Build and Deployment

### Development

- Start dev server: `npm start` or `ng serve`
- Build: `npm run build` or `ng build`

### Production Deployment

- The application is deployed to GitHub Pages
- Build for production: `ng build --configuration production --base-href "https://2ajoyce.github.io/ediviewer/"`
- Deploy: `npm run deploy-prod`

## State Management

- Use NgRx Store for state management
- Actions should be defined in `*.actions.ts` files
- Reducers should be defined in `*.reducer.ts` files
- The main store is configured in `app.module.ts` with `StoreModule.forRoot()`

## EDI File Parsing

When working with EDI file parsing functionality:

- EDI files contain structured data with specific delimiters
- Key delimiters: segment delimiter, element delimiter, component separator
- The `FileParserService` handles reading and parsing EDI files
- Parsed content is stored in the `EdiFile` model
- Each element has a reference (`ref`), index, and data

## Linting

- Run linter: `ng lint`
- TSLint configuration is in `tslint.json` at the root level
- Fix linting issues before committing code
- Follow the Codelyzer rules for Angular-specific linting

## Import Guidelines

- Do not import from `rxjs/Rx` (use specific imports instead, e.g., `import { Observable } from 'rxjs'`)
- Organize imports with Angular imports first, then third-party, then local imports

## SCSS Guidelines

- Main styles are in `src/styles.scss`
- Component-specific styles should be in component `.scss` files
- Use semantic class names
- Follow existing patterns for layout and styling (e.g., flexbox usage)

## Browser Support

- The application targets modern browsers as specified in `src/browserslist`
- Chrome is the primary browser for testing
