# Changesets

This folder holds **Changesets** config and pending change files. Changesets drive versioning and changelogs for publishable packages.

## How it works

1. **You change code** in one or more packages.
2. **Add a changeset:** run `pnpm changeset` at the repo root.
   - Choose which packages are affected.
   - Choose bump type: **patch** (bugfix), **minor** (feature), **major** (breaking).
   - Write a short summary (appears in CHANGELOG).
3. **Commit** the new `.md` file under `.changeset/` (e.g. `my-change.md`) in the same PR as your code.
4. **Merge to `main`:** the Release workflow runs. If there are pending changesets:
   - It opens a **"Version Packages"** PR that bumps versions and updates CHANGELOGs.
   - When that PR is merged, it runs **publish** (npm publish for each bumped package).

So: **no manual version bumps**. You only add a changeset and merge the version PR.

## Best practices

- **One changeset per logical change** (one feature/fix = one summary).
- **Add the changeset in the same PR** as the code change.
- **Private packages:** we still version them (changelog + consistency); they are not published (`privatePackages.tag: false`).
- **Scoped packages:** `access: "public"` in config so `@myorg/foo` can publish to npm without `--access public` each time.
- **Internal deps:** when package B depends on A and A gets a minor bump, B gets a patch bump (`updateInternalDependencies: "patch"`).

## Config summary (`.changeset/config.json`)

| Option | Value | Meaning |
|--------|--------|--------|
| `baseBranch` | `main` | Version PR targets this branch. |
| `changelog` | `@changesets/cli/changelog` | Default CHANGELOG generator. |
| `commit` | `false` | CI creates the version commit (don’t commit locally when running `version-packages`). |
| `access` | `public` | Scoped packages publish as public. |
| `updateInternalDependencies` | `patch` | Bump dependents by patch when a dependency is bumped. |
| `privatePackages.version` | `true` | Bump version of private packages (for changelog). |
| `privatePackages.tag` | `false` | Don’t publish private packages. |

## Optional: fixed / linked

- **`fixed`**: Array of package groups that must version together (e.g. `[["@myorg/a", "@myorg/b"]]`).
- **`linked`**: Array of package groups that share one version (e.g. Babel packages). Leave `[]` unless you need it.

## Commands (root)

- `pnpm changeset` — add a new changeset (interactive).
- `pnpm changeset status` — show pending changesets and what would be released.
- `pnpm version-packages` — consume changesets, bump versions, update CHANGELOGs (CI runs this).
- `pnpm release` — publish all version-bumped packages to npm (CI runs this after version PR is merged).

**Optional:** To require a changeset when code changes (e.g. in PRs), add a CI step that runs `pnpm changeset status --since origin/main` and fails when there are changed packages but no pending changesets. See `pnpm changeset:check` (alias for `changeset status`).
