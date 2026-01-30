# BRINIMAL - AI Agent Guide

## Project Overview

BRINIMAL is a luxury minimal jewelry brand website featuring an immersive, scroll-driven single-page experience. The site showcases editorial photography with sophisticated GSAP-powered animations and a refined visual aesthetic using a sage green and gold color palette.

**Live Site Purpose**: E-commerce showcase for minimal jewelry with lookbook gallery, collection highlights, and contact functionality.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.2 + TypeScript 5.9 |
| Build Tool | Vite 7.2 |
| Styling | Tailwind CSS 3.4 + Custom CSS |
| UI Library | shadcn/ui (New York style) + Radix UI |
| Animation | GSAP 3.14 + ScrollTrigger |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Backend | Firebase 12.8 |

---

## Project Structure

```
brinimal/
├── public/                  # Static assets (24 editorial images)
│   ├── hero_portrait.jpg
│   ├── lookbook_01.jpg ... lookbook_06.jpg
│   ├── collection_left.jpg, collection_right.jpg
│   ├── contact_portrait.jpg
│   └── ... (24 editorial images total)
├── src/
│   ├── components/
│   │   └── ui/             # shadcn/ui components (50+ components)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── sections/           # Page sections (main content)
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SignatureSection.tsx
│   │   ├── LookbookSection.tsx
│   │   ├── CollectionSection.tsx
│   │   ├── CampaignSection.tsx
│   │   ├── EssenceSection.tsx
│   │   ├── StorySection.tsx
│   │   ├── DetailSection.tsx
│   │   ├── MoodSection.tsx
│   │   ├── LightSection.tsx
│   │   ├── SilhouetteSection.tsx
│   │   ├── FormSection.tsx
│   │   ├── GraceSection.tsx
│   │   └── ContactSection.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts        # cn() helper for Tailwind
│   ├── App.tsx             # Main app with section layout
│   ├── App.css             # App-specific styles
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles + CSS variables
├── components.json         # shadcn/ui configuration
├── tailwind.config.js      # Tailwind + brand colors
├── vite.config.ts          # Vite + path aliases
├── tsconfig.app.json       # TypeScript app config
├── tsconfig.node.json      # TypeScript node config
└── tsconfig.json           # TypeScript project references
```

---

## Build and Development Commands

```bash
# Development server
npm run dev

# Production build (TypeScript compile + Vite build)
npm run build

# Lint with ESLint
npm run lint

# Preview production build locally
npm run preview
```

**Build Output**: Static files in `dist/` directory, suitable for static hosting.

---

## Architecture Details

### Section-Based Architecture
The app uses a **section-based scrolling architecture** where each section is a self-contained component:

1. **Pinned Sections** (`section-pinned` class): Full viewport (100vh) sections that pin during scroll with GSAP animations
2. **Flowing Sections**: Content sections that scroll normally (e.g., ContactSection)

### Animation System (GSAP + ScrollTrigger)
Each pinned section follows a **three-phase animation pattern**:

```typescript
// Phase 1: ENTRANCE (0% - 30% of scroll)
// Elements animate into view

// Phase 2: SETTLE (30% - 70% of scroll)
// Static viewing period

// Phase 3: EXIT (70% - 100% of scroll)
// Elements animate out before unpinning
```

**Global Snap Behavior**: App.tsx configures a global ScrollTrigger snap that automatically snaps scroll position to the center of pinned sections.

### Z-Index Stacking
Sections use progressive z-index values for proper layering:
- Hero: z-10
- Signature: z-20
- Lookbook: z-30
- ... (incrementing by 10)
- Contact: no z-index (flowing)

---

## Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Props Interface**: `{ComponentName}Props` (e.g., `HeroSectionProps`)
- **CSS Classes**: kebab-case (e.g., `section-pinned`, `heading-hero`)
- **Ref Variables**: Suffix with `Ref` (e.g., `sectionRef`, `headlineRef`)

### Section Component Template
```typescript
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SectionNameProps {
  className?: string;
}

export default function SectionName({ className = '' }: SectionNameProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Additional refs for animated elements

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // GSAP animations here
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      // ... animation phases
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="section-id" className={`section-pinned ... ${className}`}>
      {/* Content */}
    </section>
  );
}
```

### Tailwind Class Ordering
1. Layout: `relative`, `absolute`, `flex`, `grid`
2. Sizing: `w-full`, `h-screen`
3. Spacing: `px-6`, `py-4`
4. Colors: `bg-sage`, `text-[#1A1A1A]`
5. Typography: `heading-section`, `text-micro`
6. Effects: `z-10`, `opacity-90`

---

## Brand Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `sage` | `#B7C4B6` | Primary background |
| `sage-dark` | `#9CAF9B` | Darker sage |
| `gold` | `#D8A14F` | CTAs, accents, hover states |
| `offwhite` | `#F3F6F3` | Secondary background |
| `charcoal` | `#3D3D3D` | Secondary text |
| `[#1A1A1A]` | `#1A1A1A` | Primary text |

### Typography
- **Display/Hero**: Bodoni Moda (serif) - uppercase, letter-spacing 0.1-0.14em
- **Body**: Inter (sans-serif) - weights 300-600
- **Micro Labels**: Inter - 12px, uppercase, letter-spacing 0.18em

### Custom CSS Classes (from index.css)
- `heading-hero`: Large hero text with clamp sizing
- `heading-section`: Section titles
- `heading-display`: Brand/logo text
- `text-micro`: Small uppercase labels
- `cta-gold`: Gold CTA button style
- `btn-primary`: Dark button with hover gold
- `section-pinned`: Full viewport pinned section
- `editorial-image`: Image filter treatment
- `vignette`: Radial vignette overlay
- `grain-overlay`: Fixed grain texture overlay

---

## Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:

```typescript
// Use @/ prefix for src imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HeroSection from '@/sections/HeroSection';
```

---

## shadcn/ui Components

This project uses shadcn/ui with the "New York" style. Components are located in `src/components/ui/`.

**Adding new components**:
```bash
npx shadcn add button
```

**Available components** (50+):
- Form: button, input, textarea, checkbox, select, label, form
- Display: card, badge, avatar, skeleton, separator
- Overlay: dialog, sheet, drawer, popover, tooltip, hover-card
- Navigation: navigation-menu, tabs, breadcrumb, pagination
- Feedback: alert, toast (sonner), progress, skeleton
- Data: table, calendar, chart

---

## Important Implementation Notes

### GSAP Context Pattern
Always use `gsap.context()` to scope animations to the section:
```typescript
const ctx = gsap.context(() => {
  // animations here
}, section);

return () => ctx.revert(); // Cleanup on unmount
```

### ScrollTrigger Cleanup
App.tsx globally kills all ScrollTriggers on unmount:
```typescript
useEffect(() => {
  return () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);
```

### Image Optimization
- Images are in `/public/` (static files)
- Use `editorial-image` class for consistent treatment
- Images use `object-fit: cover` with slight saturation/contrast adjustments

### Mobile Considerations
- Breakpoint: 768px (`MOBILE_BREAKPOINT`)
- Responsive typography uses `clamp()`
- Mobile menu is a slide-out overlay
- Reduced motion media query respected

### Accessibility
- `prefers-reduced-motion` media query reduces animation durations
- Semantic HTML structure
- ARIA labels on interactive elements

---

## Dependencies to Know

**Key Runtime Dependencies**:
- `gsap` - Animation engine (core + ScrollTrigger plugin)
- `firebase` - Backend/auth (included but minimally used)
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` - Icon library
- `class-variance-authority` - Component variant management
- `tailwind-merge` + `clsx` - Class name utilities

**Key Dev Dependencies**:
- `kimi-plugin-inspect-react` - Development helper
- `tailwindcss-animate` - Animation utilities
- `typescript-eslint` - Type-aware linting

---

## Testing Strategy

Currently, this project does **not** have automated tests configured. To add testing:

1. Install testing libraries:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

2. Add test scripts to `package.json`.

---

## Deployment

The project builds to static files in `dist/`:

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

**Note**: `vite.config.ts` sets `base: './'` for relative path resolution.

---

## Common Tasks

### Adding a New Section
1. Create `src/sections/NewSection.tsx`
2. Follow the section component template
3. Import and add to `App.tsx` in the section sequence
4. Assign appropriate z-index class

### Adding a shadcn/ui Component
```bash
npx shadcn add component-name
```

### Modifying Brand Colors
Edit `tailwind.config.js` in the `colors` extension section, then update corresponding CSS variables in `src/index.css`.

### Adjusting Animation Timing
Modify the three-phase timing (0-30%, 30-70%, 70-100%) in each section's GSAP timeline. Keep the `end: '+=130%'` for consistency.

---

## Troubleshooting

**ScrollTrigger not working**: Ensure section refs are properly forwarded and `gsap.context()` is used.

**Z-index issues**: Check that sections have proper z-index classes in App.tsx.

**Images not loading**: Verify images are in `/public/` and referenced with root paths (e.g., `/hero_portrait.jpg`).

**Type errors**: Run `tsc -b` separately to see TypeScript errors before Vite build.
