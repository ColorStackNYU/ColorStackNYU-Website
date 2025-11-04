# ColorStack @ NYU Website - AI Coding Agent Guide

## Project Architecture

**Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
**Data Sources**: Notion API (team/events) + JSON files (resources)
**Branch**: `feat/local-mock-data` - implements mock data fallback when Notion env vars missing

### Key Structural Decisions

- **CSS Design Token System** (`src/app/globals.css`): All colors, spacing, typography use CSS custom properties (`--canvas`, `--brand-1`, `--spacing-xl`). Never use hardcoded hex colors or magic number pixels. Theme switching via `data-theme` attribute on `<html>`.
- **Graceful Degradation**: API routes return mock data when Notion credentials unavailable (`/api/team/route.ts`, `/api/events/route.ts`). This enables local development without API keys.
- **Client Components**: Most pages/components use `"use client"` directive for interactivity (Navigation, Events, Resources).

## Critical Developer Workflows

### Local Development (No Notion Setup)
```bash
npm run dev          # Starts dev server with mock data fallback
npm run validate-mock # Validates mock data structure (scripts/validate-mock-data.ts)
```
**Important**: Mock data automatically returned when `NOTION_API_TOKEN` or `NOTION_EVENTS_API_TOKEN` not set. Console warns about missing env vars but app functions normally.

### With Notion Integration
Create `.env.local` with:
```
NOTION_API_TOKEN=secret_...
NOTION_DATABASE_ID=...
NOTION_EVENTS_API_TOKEN=secret_...
NOTION_EVENTS_DATABASE_ID=...
```

### Build & Deploy
```bash
npm run build        # Production build (fails on type errors by default)
npm run lint         # ESLint with @typescript-eslint/no-explicit-any disabled
```

## Component Patterns & Conventions

### Theme-Aware Styling
Always use inline `style={{ color: "var(--text-high)" }}` for dynamic theme support:
```tsx
<h2 style={{ color: "var(--text-high)" }}>Title</h2>
<p style={{ color: "var(--text-mid)" }}>Secondary text</p>
```

### Notion API Data Transformation
Both `/api/team/route.ts` and `/api/events/route.ts` follow pattern:
1. Type guard: `typeof (notion.databases as any).query === "function"`
2. Transform Notion objects via helper functions (`toMember`, `toEventItem`)
3. Filter/sort results before returning
4. Catch specific error codes (`unauthorized`, `object_not_found`)

### File Structure for Pages
```
src/app/[page-name]/page.tsx  # Page component
src/components/[Component].tsx # Shared UI components
```
All page routes in `src/app/` except API routes in `src/app/api/`.

## Data & Content Management

### Adding Resources (Non-Developer Workflow)
Resources stored in `public/resources.json`. Contributors edit via GitHub UI (see `CONTRIBUTING.md`). Schema includes:
- Required: `id`, `title`, `description`, `link`, `category`, `dateAdded`
- Optional: `tags`, `contributedBy`
- Categories defined in `src/lib/constants.ts` (`RESOURCE_CATEGORIES`)

### Team & Events Data Flow
```
Notion Database → API Route (/api/team or /api/events) → Frontend fetch → State
```
When env vars missing: API routes return hardcoded mock arrays instead of querying Notion.

## TypeScript & Linting

- **ESLint Config** (`eslint.config.mjs`): `@typescript-eslint/no-explicit-any` disabled globally to unblock builds. Unused vars downgraded to warnings.
- **Path Aliases**: `@/*` maps to `./src/*` (see `tsconfig.json`)
- **Type Safety**: Notion API responses cast to `any` due to SDK type limitations, then transformed to typed interfaces (`Member`, `EventItem`)

## Accessibility & UX

- Skip-to-content link in `layout.tsx`: `<a href="#main-content" className="skip-link">Skip to main content</a>`
- All interactive elements have `aria-label` or `aria-labelledby`
- Theme toggle accessible via keyboard (`ThemeToggle.tsx`)
- Mobile menu locks body scroll when open (`navigation.tsx`)

## Image Handling

Next.js `<Image>` component configured to allow all remote hostnames (`next.config.ts`):
```typescript
remotePatterns: [{ protocol: 'https', hostname: '**' }]
```
Local images in `public/` referenced via absolute paths: `/Colorstack_Logo.png`, `/events/slide-1.jpg`

## Common Pitfalls

1. **Don't hardcode colors**: Use CSS variables from design token system
2. **Mock data must match real API shape**: Run `npm run validate-mock` before committing changes to mock data
3. **Client vs Server Components**: Default is Server Component in App Router. Add `"use client"` only when using hooks (`useState`, `useEffect`) or browser APIs
4. **Notion SDK types**: Cast `notion.databases` to `any` for `.query()` method access due to SDK version incompatibility

## Key Files to Reference

- **Design tokens**: `src/app/globals.css` (lines 1-100)
- **Theme system**: `src/context/ThemeContext.tsx`
- **API patterns**: `src/app/api/team/route.ts` (mock fallback implementation)
- **Validation script**: `scripts/validate-mock-data.ts` (schema enforcement)
- **Resource schema**: `public/resources.json` + `CONTRIBUTING.md`
