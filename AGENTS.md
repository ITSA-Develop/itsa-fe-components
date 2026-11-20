# Repository Guidelines

## Project Structure & Module Organization

This repository publishes the React/TypeScript package `@itsa-develop/itsa-fe-components`. The `src/` directory is organized as follows:

```
src/
├── assets/          # SVGs (imported as React components via viteSvgr) and static images
├── classes/         # Class-based utilities
├── components/      # Reusable UI components — one PascalCase folder per component
├── constants/       # App-wide constants (colors, icons, pagination defaults, etc.)
├── data/            # Static data definitions
├── enums/           # TypeScript enums (prefix E, e.g. ESize, EActionType)
├── helpers/         # Pure utility functions
├── HOC/             # Higher-Order Components and Providers (e.g. UIProvider)
├── hooks/           # Custom React hooks (prefix use, e.g. useTable)
├── interfaces/      # Shared TypeScript interfaces (prefix I)
├── lib/             # Third-party integrations and wrappers
├── routing/         # React Router utilities and route definitions
├── store/           # Zustand global stores
├── storybook/       # Storybook stories — organized in storybook/components/
├── test/            # Shared test utilities and mocks
├── types/           # Custom TypeScript types (prefix T)
├── utils/           # Additional utility functions
├── index.ts         # Public entry point — all exports go here
├── index.css        # Global styles and custom Tailwind component classes
├── tailwind-entry.css  # @tailwind directives and CSS variables (:root tokens)
└── vite-env.d.ts    # Vite type declarations (SVG, PNG modules)
```

Add public exports to `src/index.ts`. Build artifacts in `dist/` and `storybook-static/` are generated — do not edit them manually.

## Component Discovery & Usage

Before writing any UI code, **always check whether the required component already exists** in this library. The single source of truth is [`src/index.ts`](./src/index.ts) — every public component, type, hook, constant, and enum is exported from there.

### Import rule (mandatory)

All imports in consumer frontend repositories must come from the package, never directly from `antd`:

```ts
// ✅ Correct
import { Button, Modal, Table, Select } from '@itsa-develop/itsa-fe-components';
import type { IButtonProps, ISegmentedProps } from '@itsa-develop/itsa-fe-components';

// ❌ Never do this in a consumer repo
import { Button } from 'antd';
```

### Available components

| Category | Components |
|---|---|
| **Layout** | `AppLayout`, `FormLayout`, `Dashboard`, `Footer`, `AppLayoutUno` |
| **Navigation** | `BreadcrumbCustom`, `Tabs`, `TabsMaintenance`, `TabsItemContent`, `WizardSteps`, `Redirect` |
| **Buttons** | `Button`, `ButtonAddItem`, `ButtonAntd`, `ButtonIcon`, `ButtonDanger` |
| **Forms** | `FormInput`, `FormInputNumber`, `FormInputPassword`, `FormInputDatePicker`, `FormInputTimePicker`, `FormDateTimePicker`, `FormSelect`, `FormCheckBox`, `FormRadio`, `FormSwitch`, `FormTextarea`, `FormLabel`, `FormLabelError`, `FormButtonSelector`, `FormSelectorDebounce` |
| **Inputs** | `Input`, `InputNumber`, `InputPassword`, `InputSearch`, `InputAddress` |
| **Filters** | `FilterInput`, `FilterSelect`, `FilterInputDatePicker`, `FilterSearchContainer`, `FilterInputObservation` |
| **Data Display** | `Table`, `TableDetails`, `TableDetailsMobile`, `TableMobile`, `TableMobileTypeCollapse`, `DetailView`, `Descriptions`, `InfoRow`, `ItemList`, `List` |
| **Feedback** | `Alert`, `Notification`, `Spin`, `Skeleton`, `Progress`, `Popconfirm` |
| **Overlays** | `Modal`, `ModalResponsive`, `Drawer`, `Tooltip` |
| **Media** | `Image`, `ImageCatalog`, `ImageMaintenance`, `ImagePreview`, `UploadImage`, `Carousel` |
| **Selectors** | `Select`, `SelectMultiFilter`, `Segmented`, `Radio`, `Checkbox`, `Switch`, `Dropdown`, `DropdownButton`, `DropdownCustomLabel`, `DropdownIcon`, `SelectorButtonList`, `FormButtonSelector`, `IconSelectAntd`, `IconSelector` |
| **Tags & Badges** | `Tag`, `TagStatus`, `Badge` |
| **Cards & Panels** | `Card`, `Collapse`, `ActionPanel`, `StackedCards` |
| **Maps & Location** | `Map`, `MapUno`, `LocationSelector`, `LocationDisplay`, `InputAddress`, `MultipleAddress` |
| **Auth & Users** | `Login`, `UserProfileDrawer`, `Avatar` |
| **Other** | `Empty`, `WithoutInformation`, `ErrorBoundary`, `ErrorPage`, `LoadingApp`, `Divider`, `Link`, `Title`, `Fade`, `TreeNode`, `VehiclePartSelector`, `ConfirmDeleteModal`, `CustomFooterModal`, `DocumentationGuide` |
| **Providers / HOC** | `UIProvider`, `ControlActionsProvider`, `NotificationsProvider`, `ResponsiveModalProvider`, `AppLayoutFooterProvider` |

### Also available from `@itsa-develop/itsa-fe-components`

- **Icons** — `export * from './assets/icons'` (~150+ SVG icons as React components)
- **Enums** — `export * from './enums'` (e.g. `EActionType`, `ESize`, `EStatus`)
- **Hooks** — `export * from './hooks'` (e.g. `useTable`, `useOnlineStatus`)
- **Helpers** — `export * from './helpers'`
- **Constants** — `export * from './constants'`
- **Interfaces & Types** — `export * from './interfaces'`, `export * from './types'`
- **Store** — `export * from './store'` (Zustand stores)

> **If a component you need is not in the table above**, follow the _Creating New / Missing Components_ protocol below instead of importing from `antd` directly.

## Build, Test, and Development Commands

- `yarn storybook` — starts the component workshop on port 6006 and watches Tailwind CSS.
- `yarn build` — cleans `dist/`, type-checks, bundles with Vite, and builds the package stylesheet.
- `yarn tscheck` — runs TypeScript validation without emitting files.
- `yarn lint` — runs ESLint with zero warnings allowed.
- `yarn lint:fix` — applies ESLint safe auto-fixes before running `yarn lint`.
- `yarn prettier:check` — verifies formatting; `yarn prettier` rewrites supported source files.
- `yarn test`, `yarn test:watch`, and `yarn test:coverage` — run Vitest once, interactively, or with V8 coverage.

Use Node.js 22 or newer and Yarn, as specified in `package.json`.

## Coding Style & Naming Conventions

Prettier is authoritative: **tabs**, **single quotes**, **semicolons**, **trailing commas**, **120-column width**. ESLint enforces TypeScript, React Hooks, Storybook, strict boolean expressions, and forbids non-null assertions.

### Naming prefixes (mandatory)

| Entity | Prefix | Example |
|---|---|---|
| Component prop interfaces | `I` | `IButtonProps`, `ITooltipProps` |
| Shared interfaces | `I` | `IUserProfile`, `IPagination` |
| Enums | `E` | `EActionType`, `ESize`, `EStatus` |
| Custom types | `T` (optional) | `TDate`, `TApiError` |
| Private functions | `_` | `_transformData` |
| Custom hooks | `use` | `useTable`, `useOnlineStatus` |

### File naming

- Components and their folders: **PascalCase** — `SelectMultiFilter/`, `ButtonIcon.tsx`
- Hooks: **camelCase** — `useTable.ts`
- Tests: `<Name>.test.tsx`
- Stories: `<Name>.stories.tsx` — placed in `src/storybook/components/`, not alongside the component
- Enums: `index.ts` inside `src/enums/`

### ESLint rules that affect generated code

- **`@typescript-eslint/no-non-null-assertion: error`** — Never use `!` (non-null assertion). Use optional chaining (`?.`) or explicit null checks instead.
- **`@typescript-eslint/strict-boolean-expressions: error`** — Always evaluate booleans explicitly (e.g. `value !== undefined` instead of `if (value)`).
- **`react-hooks/exhaustive-deps: warn`** — Always include all dependencies in `useEffect`, `useMemo`, `useCallback` arrays.

### Import alias

Use `@/` as an alias for `src/` in all imports within this repository:

```ts
// ✅ Correct
import { useTable } from '@/hooks';
import { EActionType } from '@/enums';
import { Button } from '@/components/Button';

// ❌ Never use relative paths across feature boundaries
import { Button } from '../../../components/Button';
```

## Creating New / Missing Components (Ant Design Wrapper Protocol)

Consumer frontend repositories must **NEVER** import components directly from `antd`. All UI components must be created, wrapped, and exported from `@itsa-develop/itsa-fe-components`.

When a required UI component does not exist in this library, follow these steps:

### 1. Verification
Search `src/components/` and `src/index.ts` to verify the component does not already exist under another name.

### 2. Directory & File Structure
Create a new folder `src/components/<PascalCaseName>/` with:

```
src/components/<PascalCaseName>/
├── <PascalCaseName>.tsx        # Component implementation (antd wrapper)
└── <PascalCaseName>.test.tsx   # Vitest unit tests
```

Create the Storybook story separately at:
```
src/storybook/components/<PascalCaseName>.stories.tsx
```

### 3. Design System & Prop Guidelines (`DESING.md`)

- Component prop interfaces **MUST** start with the `I` prefix (e.g., `ITooltipProps`).
- Extend original Ant Design props where appropriate, using an alias for the import:
  ```tsx
  import { Tooltip as AntTooltip, TooltipProps as AntTooltipProps } from 'antd';

  export interface ITooltipProps extends AntTooltipProps {
    // custom extensions if needed
  }
  ```
- Apply Tailwind CSS design tokens from `tailwind.config.js`:
  - Primary color: `bg-primary-800` → `#EA3B48`
  - Gray scale: `text-gray-700`, `bg-gray-50`, etc.
  - Font: `font-sans` → `Public Sans`
- Always allow `className` and `style` props to be passed through for customization.
- Never use non-null assertions (`!`). Use optional chaining or explicit guards.
- Never write boolean expressions without explicit comparison (e.g. `value !== undefined`).

### 4. Public Export
Re-export both the component and its interface in `src/index.ts`:

```ts
export { Tooltip } from './components/Tooltip/Tooltip';
export type { ITooltipProps } from './components/Tooltip/Tooltip';
```

### 5. Validation Checklist

Run in this order:

```bash
yarn lint:fix      # Apply automatic ESLint fixes first
yarn tscheck       # Zero TypeScript errors
yarn lint          # Zero ESLint warnings
yarn prettier      # Format code
yarn test          # All unit tests pass
yarn build         # Package compiles successfully
```

### 6. Commit Convention
Use Conventional Commits:

```
feat: add Tooltip component wrapped from Antd
```

## Testing Guidelines

Vitest runs in **`jsdom`** environment with `@testing-library/react` and `setupTests.ts` (which sets up jest-dom matchers). Write behavior-focused tests — assert what the component renders or does, not implementation details.

- Place unit tests alongside the component: `src/components/<Name>/<Name>.test.tsx`.
- Shared test utilities and mocks live in `src/test/`.
- Update snapshots only after reviewing the rendered change.
- Coverage targets `src/components` and `src/helpers`; no numeric threshold is configured.

Before submitting, always run `yarn test`, `yarn lint`, and `yarn tscheck`.

## Commit & Pull Request Guidelines

Follow Conventional Commits, enforced by commitlint:

- `feat: add filter component`
- `fix: correct table selection`
- `chore: update package version`

Keep commits focused. Pull requests should target `develop`, explain behavior and API/export changes, and link the relevant issue.
