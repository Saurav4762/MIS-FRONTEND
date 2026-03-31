# Master Setup Feature Structure

## Directory Structure

```
src/pages/master-setup/
├── lib/
│   ├── routes.ts              # Type-safe route builder & section types
│   └── index.ts               # Barrel exports
├── ui/
│   ├── MasterSetupPage.tsx    # Main hub page with 6 setup cards
│   ├── SetupCard.tsx          # Reusable card component for navigation
│   ├── MasterSetupSectionPage.tsx  # Router - routes to section components
│   └── sections/
│       ├── shared/
│       │   ├── SectionHeader.tsx      # Reusable header with back button & add button
│       │   ├── SectionTable.tsx       # Generic table component (type-safe)
│       │   └── index.ts
│       ├── wards/
│       │   ├── WardsPage.tsx
│       │   ├── wards.data.ts          # Mock data & types
│       │   └── index.ts
│       ├── toles/
│       │   ├── TolesPage.tsx
│       │   ├── toles.data.ts
│       │   └── index.ts
│       ├── departments/
│       │   ├── DepartmentsPage.tsx    # Placeholder
│       │   └── index.ts
│       ├── programs/
│       │   ├── ProgramsPage.tsx       # Placeholder
│       │   └── index.ts
│       ├── fiscal-years/
│       │   ├── FiscalYearsPage.tsx    # Placeholder
│       │   └── index.ts
│       ├── survey-options/
│       │   ├── SurveyOptionsPage.tsx
│       │   ├── survey-options.data.ts
│       │   └── index.ts
│       └── index.ts                   # Barrel exports all sections
└── index.ts                   # Feature exports

Routes:
/_app/_app/master-setup              -> MasterSetupPage (hub with cards)
/_app/_app/master-setup/$section     -> Dynamic section pages
                                        (wards, toles, departments, etc.)
```

## Key Design Patterns

### 1. **Type-Safe Sections**
- `MasterSetupSection` type in `lib/routes.ts` defines valid sections
- Once you're at a section page, TypeScript validates it

### 2. **Reusable Components**
- **SectionHeader**: Back button, title, description, add button
- **SectionTable**: Generic table with type-safe columns

### 3. **Data Management Pattern**
Each section (wards, toles, survey-options) follows:
```
SectionPage.tsx        # Main component using SectionHeader + SectionTable
section.data.ts        # Mock data & TypeScript types
index.ts              # Barrel export
```

### 4. **Router Flow**
```
MasterSetupPage (hub)
  ↓ (click card with section="wards")
MasterSetupSectionPage (router)
  ↓ (validates section type)
WardsPage (renders content)
```

## How to Add a New Section

1. Create folder: `sections/my-section/`
2. Create files:
   ```tsx
   // my-section-data.ts
   interface MySection { ... }
   export const mockMySection: MySection[] = [...]
   
   // MySection.tsx
   export function MySectionPage() {
     return (
       <>
         <SectionHeader title="my-section" ... />
         <SectionTable columns={...} data={mockMySection} />
       </>
     )
   }
   ```
3. Export in `sections/index.ts`
4. Update `lib/routes.ts` with new section type
5. Add to `MasterSetupPage.tsx` with `<SetupCard section="my-section" />`

## Column Types (SectionTable)

```tsx
const columns: TableColumn<MyType>[] = [
  {
    key: "fieldName",      // Property name from data
    label: "Display Name", // Header text
    render: (value, row) => <Custom>{value}</Custom>  // Optional custom render
  }
]
```

The table is fully type-safe - only allows columns that exist on your data type.
