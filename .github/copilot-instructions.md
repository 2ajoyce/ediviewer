# Copilot Instructions for EDI Viewer

## Project Overview

This is an Angular application for viewing and parsing EDI (Electronic Data Interchange) files. The application allows users to drag and drop EDI files (e.g., .850 files) to view their structured content with segment delimiters, element delimiters, and component separators clearly displayed.

## Technology Stack

- **Framework**: Angular 20
- **State Management**: Signals (built-in Angular feature)
- **Language**: TypeScript (latest version)
- **Styling**: SCSS
- **Testing**: Jasmine and Karma
- **Linting**: ESLint

## Code Style Guidelines

### TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Use single quotes for strings
- Always use semicolons
- Maximum line length: 140 characters
- Use spaces for indentation (not tabs)
- Prefer `const` over `let` when variables are not reassigned
- No usage of `var` keyword
- Use arrow functions where appropriate

### Angular Best Practices

- **Always use standalone components** (no NgModules)
- **Use signals for state management** instead of NgRx or services with BehaviorSubject
- Implement lazy loading for feature routes
- Avoid using `@HostBinding` and `@HostListener` decorators; use the `host` object within the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in the `@Component` decorator
- Use the `inject()` function instead of constructor injection
- Prefer inline templates for small components

### Component Design

- Keep components small and focused on a single responsibility
- Component class names must have the `Component` suffix
- Use `input()` and `output()` functions instead of `@Input()` and `@Output()` decorators
- Use the `app` prefix for all custom components and directives
- Use lifecycle interfaces (e.g., `implements OnInit`)

### Directives

- Directive class names must have the `Directive` suffix
- Use the `host` object in the `@Directive` decorator instead of `@HostBinding` and `@HostListener`

### Pipes

- Use pipe transform interface for custom pipes
- Pipes should be standalone

### State Management with Signals

- Use signals for local component state
- Keep state transformations pure and predictable
- Do not use `mutate` on signals; use `update` or `set` instead
- Signals replace the need for NgRx Store in most cases

### Service Design

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

### Template Best Practices

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives like `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables when needed
- Prefer signal-based reactivity over observables for local state

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
- Test files should have `.spec.ts` extension

## Build and Deployment

### Development

- Start dev server: `npm start` or `ng serve`
- Build: `npm run build` or `ng build`

### Production Deployment

- The application is deployed to GitHub Pages
- Build for production: `ng build --configuration production --base-href "https://2ajoyce.github.io/ediviewer/"`
- Deploy: `npm run deploy-prod`

## State Management

- Use signals for state management (built-in Angular feature)
- Signals replace the traditional need for NgRx Store or services with BehaviorSubject
- Keep state transformations pure and predictable
- Use `signal()` to create writable signals
- Use `computed()` for derived state
- Use `effect()` for side effects based on signal changes

## EDI File Parsing

When working with EDI file parsing functionality:

- EDI files contain structured data with specific delimiters
- Key delimiters: segment delimiter, element delimiter, component separator
- The `FileParserService` handles reading and parsing EDI files
- Parsed content is stored in the `EdiFile` model
- Each element has a reference (`ref`), index, and data

## Linting

- Run linter: `ng lint`
- ESLint configuration should follow Angular best practices
- Fix linting issues before committing code

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
