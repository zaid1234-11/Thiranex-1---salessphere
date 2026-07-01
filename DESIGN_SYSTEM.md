# Design System

SalesSphere does not treat design as an afterthought. We implement a rigorous, custom design system utilizing Tailwind CSS, adhering closely to the principles popularized by libraries like `shadcn/ui`, but tailored for a premium data-heavy enterprise environment.

## Philosophy

The design system is governed by three rules:
1. **Content over Chrome:** Borders should be subtle (`border-border`), and backgrounds should recede (`bg-background`). The data (Charts, KPIs) must be the most vibrant elements on the screen.
2. **Predictable Interaction:** Every interactive element must have a hover state, an active state, and a focus ring for accessibility.
3. **Intentional Motion:** Animations should guide the eye, not distract it.

## Color Palette

We utilize a custom HSL-based CSS variable system for effortless theming.

- **Background:** `#f3f6f9` (Cool, professional gray-blue)
- **Foreground:** `#2f4157` (Deep slate for high readability without the harshness of pure black)
- **Primary:** `#567c8e` (Trustworthy, muted teal)
- **Secondary / Muted:** `#e3ecf2` (Soft structural backgrounds)

*Why no pure black/white?* Pure contrast causes eye strain in dashboards where users stare at data grids for hours. Muted slates are industry standard for enterprise SaaS.

## Typography

- **Font Family:** `Inter`, served via Google Fonts with `display=swap`.
- **Scale:** We strictly adhere to Tailwind's default type scale (`text-sm` for data tables, `text-3xl` for page headers) to maintain vertical rhythm.
- **Weight:** Data values are `font-bold` (700), headers are `font-semibold` (600), and body is `font-normal` (400).

## Spacing & Radius

- **Grid System:** standard 8px grid (Tailwind `gap-6` = 24px).
- **Radius:** We use a slightly rounded aesthetic (`--radius-lg: 0.5rem`) to soften the dense, data-heavy layout, making the software feel modern and approachable rather than brutalist.

## Motion & Interaction

We defined centralized motion tokens in `src/styles/motion.ts` using `framer-motion`.

- **Hover (150ms):** Used for micro-interactions like card elevations.
- **Card Enter (250ms):** Used when staggering the entrance of dashboard widgets.
- **Page Transition (350ms):** Used when routing between modules.
- **KPI Count (700ms):** The exact duration it takes for the `CountUp` component to settle, drawing immediate attention to top-line metrics upon load.

## Component Architecture

Instead of writing custom CSS classes, we encapsulate styling into reusable React components (`Card`, `Badge`, `MetricCard`). This ensures that if the padding of a Card needs to change from `p-6` to `p-4`, we change it in exactly one file (`src/components/design-system/card.tsx`), instantly updating the entire application.

## Charts

We use `Recharts` mapped directly to our CSS variables:
```css
/* Example */
color: hsl(var(--primary))
```
This guarantees that if the global theme changes, the charts automatically follow suit without touching the D3/Recharts configuration.
