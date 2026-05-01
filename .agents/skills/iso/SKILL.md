```markdown
# iso Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `iso` JavaScript repository. You'll learn how to structure files, write imports and exports, follow commit message conventions, and organize tests. The repository does not use a framework, focusing on clean, modular JavaScript code.

## Coding Conventions

### File Naming
- Use **PascalCase** for all file names.
  - Example: `DateUtils.js`, `IsoFormatter.js`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```javascript
    import { formatDate } from './DateUtils';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```javascript
    // In DateUtils.js
    export function formatDate(date) { /* ... */ }
    ```

### Commit Messages
- Follow **Conventional Commits** with the `feat` prefix for features.
  - Example:
    ```
    feat: add ISO date parsing utility
    ```
- Average commit message length: ~73 characters.

## Workflows

### Feature Development
**Trigger:** When adding a new feature or utility function  
**Command:** `/feature-development`

1. Create a new file using PascalCase (e.g., `NewFeature.js`).
2. Write your code using named exports.
3. Import dependencies using relative paths.
4. Write corresponding tests in a file named `NewFeature.test.js`.
5. Commit your changes with a conventional message:
    ```
    feat: [short description of the feature]
    ```
6. Push your branch and open a pull request.

### Testing
**Trigger:** When verifying code correctness  
**Command:** `/run-tests`

1. Ensure your test files are named with the pattern `*.test.*` (e.g., `DateUtils.test.js`).
2. Use the project's preferred (unspecified) test runner to execute tests.
3. Confirm all tests pass before merging changes.

## Testing Patterns

- Test files are named using the pattern `*.test.*` (e.g., `IsoFormatter.test.js`).
- The testing framework is unspecified; follow project or team guidelines.
- Place test files alongside the modules they test or in a dedicated test directory.

**Example Test File:**
```javascript
// DateUtils.test.js
import { formatDate } from './DateUtils';

test('formats date to ISO string', () => {
  expect(formatDate(new Date('2024-01-01'))).toBe('2024-01-01T00:00:00.000Z');
});
```

## Commands
| Command             | Purpose                                   |
|---------------------|-------------------------------------------|
| /feature-development| Start a new feature using repo conventions|
| /run-tests          | Run all test files in the repository      |
```
