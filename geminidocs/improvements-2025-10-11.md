# Theme and Design System Refactoring

- **Date:** 2025-10-11
- **Author:** Gemini

---

### Summary

This document outlines the refactoring of the project's design system to fully integrate the custom brand identity with the `shadcn/ui` component library. The goal was to improve development efficiency, ensure design consistency, and enhance long-term maintainability.

### Problem

Previously, the project's custom color palette (defined as `scc-` colors in `tailwind.config.js`) was disconnected from the `shadcn/ui` theming system. This required developers to manually apply brand colors to components using `className` overrides, leading to potential inconsistencies and making theme-wide changes (especially for dark mode) difficult and error-prone.

### Solution

A two-step process was implemented to create a centralized, unified theming system:

1.  **Centralized Theming in `globals.css`**
    - All custom brand colors were converted from HEX to HSL format.
    - These HSL values were used to define the standard `shadcn/ui` CSS variables (e.g., `--background`, `--foreground`, `--primary`, `--accent`, `--destructive`) in the `@layer base` of `globals.css`.
    - Separate, comprehensive theme definitions were created for both light (`:root`) and dark (`.dark`) modes.
    - The `body` element's style was updated to use `@apply bg-background text-foreground`, allowing it to automatically adapt to theme changes.

2.  **Simplified `tailwind.config.js`**
    - The `theme.extend.colors` object was replaced with the standard `shadcn/ui` configuration, which references the new CSS variables (e.g., `primary: "hsl(var(--primary))"`).
    - The custom `scc-` color definitions were removed.
    - The advanced (but non-standard) fluid typography and spacing configurations were removed from the `theme` object to ensure full compatibility with `shadcn/ui` components and standard Tailwind classes. The project's existing semantic and responsive classes in `globals.css` (e.g., `.heading-1`, `.section-padding`) should be used instead.
    - Standard `shadcn/ui` configurations for `borderRadius` and `animation` were added for consistency.

### Benefits

-   **Consistency:** All `shadcn/ui` components now automatically adopt the correct brand colors for both light and dark modes out-of-the-box.
-   **Efficiency:** Developers no longer need to manually apply color classes to components, speeding up development.
-   **Maintainability:** To update a brand color, you only need to change the corresponding HSL value in `globals.css`, and the change will propagate globally and consistently.

### Action Required for Developers

-   When styling components, use the standard `shadcn/ui` variants (e.g., `<Button variant="destructive">`).
-   For sizing, spacing, and typography, use standard Tailwind utility classes (e.g., `p-4`, `text-lg`, `rounded-md`) which are expected by `shadcn/ui` components, or use the project's custom semantic responsive classes defined in `globals.css` (e.g., `.section-padding`, `.heading-1`).

---

# Visual Polish: Page Transition Animation

- **Date:** 2025-10-11
- **Author:** Gemini

---

### Summary

To enhance the visual appeal and user experience of the application, a smooth, consistent page transition animation was implemented using the pre-existing `framer-motion` library.

### Implementation

1.  **`PageTransition.tsx` Component Creation:**
    - A new reusable component was created at `components/layout/PageTransition.tsx`.
    - This component utilizes `framer-motion`'s `<AnimatePresence>` and `<motion.div>` to manage the lifecycle of page animations.
    - It uses the `usePathname` hook from `next/navigation` to listen for route changes, which serves as the key to trigger the enter/exit animations.
    - A modern `clip-path` animation was implemented to create a subtle "reveal" effect when pages transition, providing a more polished feel than a simple fade.

2.  **Integration into Root Layout:**
    - The new `PageTransition` component was imported into the main `app/layout.tsx` file.
    - It was used to wrap the `{children}` prop within the `<ThemeProvider>`, ensuring that every page in the application is rendered with the transition effect.

### Benefit

-   **Enhanced User Experience:** The fluid animations make the application feel more responsive, modern, and professional, improving the overall perception of quality.
-   **Consistency:** A single, centralized component provides a consistent navigation experience across the entire site.

---

# Refactoring: Code Duplication and Separation of Concerns

- **Date:** 2025-10-11
- **Author:** Gemini

---

### Summary

This document details the refactoring process to resolve a critical runtime error (`Unsupported Server Component type: undefined`) and subsequently improve codebase health by eliminating duplicated code.

### Problem 1: Runtime Error due to Mixed Utilities

- **Root Cause:** A runtime error occurred because the utility file `@/lib/utils.ts` mixed server-safe functions (like `cn`) with client-only functions that use browser APIs like `window` and `document` (e.g., `scrollToSection`, `checkBusinessHours`).
- **Impact:** When a Server Component imported a chain of modules that led to `utils.ts`, the server-side rendering process would fail upon encountering the client-only code, causing the entire module to fail and return `undefined`.

### Solution 1: Separation of Concerns

1.  **File Splitting:** The `utils.ts` file was split into two distinct files:
    -   `@/lib/utils.ts`: Now contains only the server-safe `cn` function.
    -   `@/lib/client-utils.ts`: A new file created to hold all client-only functions (`scrollToSection`, `checkBusinessHours`, etc.). This file is explicitly marked with the `'use client';` directive.
2.  **Error Resolution:** This separation ensures that server-side processes only load server-safe code, resolving the runtime error.

### Problem 2: Code Duplication

- **Discovery:** While investigating the error, it was discovered that the `scrollToSection` function was not being imported from a central utility file. Instead, it was duplicated and defined locally in four separate components:
    - `components/header.tsx`
    - `components/footer.tsx`
    - `components/hero-section.tsx`
    - `components/package-comparison.tsx`
- **Impact:** This duplication made the code harder to maintain and prone to inconsistencies. A change to the scroll behavior would require edits in four different places.

### Solution 2: Centralization and Refactoring

1.  **Code Removal:** The local, duplicated `scrollToSection` function was removed from all four components.
2.  **Centralized Import:** Each of the affected components was updated to import the single, canonical `scrollToSection` function from the newly created `@/lib/client-utils.ts`.

### Benefits

-   **Bug Fix:** The critical runtime error is resolved, allowing pages like `/privacy-policy` to render correctly.
-   **Maintainability:** The codebase is now cleaner and easier to maintain. The `scrollToSection` logic exists in only one place.
-   **Robustness:** The clear separation between server and client utilities prevents similar server-side rendering errors in the future.
