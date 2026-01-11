# AGENTS

Local engineering guidelines for this repo. Follow these as the preferred "correct" style unless explicitly asked otherwise.

## General
- Use TypeScript everywhere in this repo.
- Prefer small, focused modules with clear names.
- Use ESM imports with explicit file extensions where the backend expects them.
- Keep code readable; avoid clever one-liners when clarity suffers.

## Backend (backend/)
### Architecture
- Keep the flow: router -> controller -> service -> repository.
- Controllers handle HTTP details and translate errors; services contain business logic; repositories only read/write data.
- Use Inversify for dependency injection (`@injectable`, `@inject`, `TYPES`).

### Imports and paths
- Use TS path aliases (`@core`, `@services`, `@repositories`, `@controllers`, `@middlewares`, `@dto`, `@errors`).
- Use `.js` extensions in backend imports (NodeNext / ESM).

### Errors and responses
- Use `ResponseError` for expected errors and `HTTP_CODES` for status codes.
- Let `errorMiddleware` format error responses `{ error: string }`.
- Prefer throwing from services/validation and handle in middleware/controllers.

### DTO and types
- Keep DTOs as types only.
- Prefer explicit return types for public service methods.

## Frontend (frontend/)
### Architecture
- Pages in `src/pages`, reusable components in `src/components`.
- Hooks in `src/hooks`, API calls in `src/api.ts`.

### React style
- Use function components.
- Use `type` for props (not `interface`).
- Prefer named exports for components; pages can use default export.

### UI
- Use MUI with `sx` for styling.
- Respect `createAppTheme` tokens and the existing visual system.
- Use `index.css` only for global resets.

### Data fetching and errors
- Use `fetch` with `handleJson` and `HttpError` from `src/api.ts`.
- Show user-facing errors with `useErrorSnackbar` / notistack.