# Monorepo Starter

A generic TypeScript monorepo starter with pnpm workspaces, Turborepo, Changesets, and shared tooling. Use this as a base when starting a new monorepo project.

## Stack

- **Package manager:** pnpm (workspaces + catalog)
- **Build orchestration:** Turborepo
- **Releases:** Changesets (versioning + changelog + publish)
- **Linting:** ESLint **per package** — each package has its own `eslint.config.mjs` extending shared `@repo/eslint-config`; root config only lints repo-root files
- **Testing:** Vitest
- **TypeScript:** Shared `@repo/typescript-config` (base, nextjs, react-library, node-library)
- **Git hooks:** Husky + lint-staged + Commitlint (conventional commits)
- **CI:** GitHub Actions (lint, typecheck, test, build; optional Codecov; Changesets release workflow)

## Requirements

- Node.js ≥ 20.12
- pnpm ≥ 10.16

## Quick start

```bash
# Install dependencies
pnpm install

# Run checks (typecheck, lint, test)
pnpm check

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Project structure

```
.
├── apps/                 # Applications (Next.js, etc.) — add as needed
├── packages/              # Shared libraries and packages
│   └── example/           # Placeholder internal package (replace or remove)
├── tooling/               # Shared configs (consumed by packages)
│   ├── eslint-config/    # @repo/eslint-config
│   └── typescript-config/ # @repo/typescript-config
├── turbo/
│   └── generators/       # Turbo codegen (pnpm gen)
├── .changeset/           # Changeset config and pending changes
├── .github/workflows/     # CI and release workflows
└── .husky/               # Git hooks
```

## Linting (per package)

ESLint is configured **per package**: each package has its own `eslint.config.mjs` that extends `@repo/eslint-config`. The root `eslint.config.mjs` only lints repo-root files (e.g. `turbo/`, config files); it ignores `packages/` and `apps/`. When you run `pnpm run lint` or `pnpm run lint:fix`, Turbo runs the lint script in each package using that package’s config. New packages from `pnpm gen` get an `eslint.config.mjs` template.

## Adding packages

Use Turbo generators (recommended):

```bash
# Internal package (src only, not published)
pnpm gen
# Choose "pkg-basic", set name, path, scope (e.g. myorg), description

# Publishable package (builds to dist/, publishable to npm)
pnpm gen
# Choose "pkg-publishable", set name, path, scope, description
```

Or copy `packages/example` and adjust name, scope, and code.

## Releasing (Changesets)

**Flow:** Add a changeset → commit it with your PR → merge to `main` → Release workflow opens a "Version Packages" PR → merge that PR → packages are published to npm.

**Best practices:**

- **One release branch:** Release workflow runs only on `main` (single source of truth for versions).
- **One changeset per logical change:** Run `pnpm changeset`, pick affected packages and bump type (patch/minor/major), write a short summary.
- **Commit the changeset in the same PR** as the code change.
- **Publish:** Requires `NPM_TOKEN` secret in the repo. Publishable packages use `prepublishOnly: "pnpm build"` so they build before publish.

Full details and config options: [.changeset/README.md](.changeset/README.md).

## Scripts (root)

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages |
| `pnpm dev` | Run dev in all packages (persistent) |
| `pnpm lint` / `pnpm lint:fix` | Lint / fix |
| `pnpm typecheck` | Type-check all packages |
| `pnpm test` | Run tests |
| `pnpm test:coverage` | Tests with coverage |
| `pnpm clean` | Remove build artifacts |
| `pnpm changeset` | Add a changeset |
| `pnpm version-packages` | Apply changesets (version bump) |
| `pnpm release` | Publish to npm (run after version-packages in CI) |
| `pnpm check` | typecheck + lint + test |
| `pnpm validate` | check + commitlint on last commit |
| `pnpm gen` | Run Turbo generators (new packages) |
| `pnpm ci` | typecheck, lint, test, build (CI pipeline) |

## Git hooks (Husky)

- **pre-commit:** Block direct commits to `main`/`master`; lint-staged runs ESLint on staged files
- **commit-msg:** Commitlint enforces conventional commits (e.g. `feat(scope): message`)
- **pre-push:** typecheck + lint (tests can be enabled in `.husky/pre-push`)

## Customization

1. **Rename repo:** Change `name` in root `package.json` and update README.
2. **Scope:** New packages default to scope `myorg` in generators; change in `turbo/generators/config.ts` or when running `pnpm gen`.
3. **Branches:** CI runs on `main` and `develop`; **Release (Changesets) runs on `main` only**. Adjust in `.github/workflows/*` and `.changeset/config.json`.
4. **Commitlint:** Optional scope is allowed; tighten in `commitlint.config.cjs` if you want required scopes.
5. **Tooling:** Extend `tooling/eslint-config` and `tooling/typescript-config` for your rules and tsconfig variants.

## License

MIT (or your choice)
