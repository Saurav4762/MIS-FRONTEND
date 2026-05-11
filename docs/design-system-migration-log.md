# Design System Migration Log (Tailwind v4)

## Session: 2026-05-11

### Step 0: Process Guardrails
- Confirmed Tailwind v4 usage (`@import "tailwindcss"` in global stylesheet).
- Rule: no hardcoded hex in migrated files.
- Rule: run `npm run typecheck` and `npm run lint` after each migration batch.
- Rule: document each batch here before moving on.

### Step 1: Completed before this phase
- Added base design tokens in `src/app/styles/index.css`.
- Added shared primitives:
  - `Button`
  - `Input`
  - `Textarea`
  - `FormField`
  - `Modal`
- Migrated survey-options module and aligned shared header/table components.
- Validation passed (`typecheck` + `lint`).

### Step 2: Current phase (in progress)
- Running codebase audit to identify remaining hardcoded UI styles.
- Next: migrate remaining master-setup modules one-by-one using shared primitives.

### Step 3: Wards + Municipalities token migration
- Performed bulk hex-to-token migration for these files:
  - `src/pages/master-setup-wards/ui/WardsPage.tsx`
  - `src/pages/master-setup-wards/ui/WardAddForm.tsx`
  - `src/pages/master-setup-wards/ui/WardEditForm.tsx`
  - `src/pages/master-setup-wards/ui/WardDeleteConfirmBox.tsx`
  - `src/pages/master-setup-municipalities/ui/MunicipalityPage.tsx`
  - `src/pages/master-setup-municipalities/ui/MunicipalityAddForm.tsx`
  - `src/pages/master-setup-municipalities/ui/MunicipalityEditForm.tsx`
  - `src/pages/master-setup-municipalities/ui/MunicipalityDeleteConfirmBox.tsx`
- Replaced remaining literal hex values in these two modules.
- Normalized modal overlays to `mis-modal-overlay` where needed.
- Status: code updated, validation pending.

### Step 4: Next queued modules
- `src/pages/master-setup-departments/**`
- `src/pages/master-setup-fiscal-years/**`
- `src/pages/master-setup-programs/**`
- `src/pages/master-setup-toles/**`
- `src/pages/master-setup-municipalities/**` (follow-up component cleanup to shared primitives)

## Resume Notes
- If interrupted, continue from "Step 2: Current phase".
- Re-run audit command and continue module sequence.
