# RND Hub Design Guidelines

## Design Approach
**Selected Framework:** Material Design-inspired information portal with premium academic aesthetics. Drawing from modern education platforms like Canvas and Blackboard but with elevated visual polish similar to Notion's organization principles.

## Core Design Elements

### Typography Hierarchy
**Headings (Outfit):**
- H1: 3rem (48px), font-weight: 700, tracking: -0.02em
- H2: 2.25rem (36px), font-weight: 600
- H3: 1.75rem (28px), font-weight: 600
- H4: 1.25rem (20px), font-weight: 500

**Body (DM Sans):**
- Body Large: 1.125rem (18px), font-weight: 400, line-height: 1.7
- Body Regular: 1rem (16px), font-weight: 400, line-height: 1.6
- Body Small: 0.875rem (14px), font-weight: 400
- Labels/Meta: 0.75rem (12px), font-weight: 500, uppercase, tracking: 0.05em

### Layout System
**Spacing Scale:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card internal padding: p-6
- Gap between elements: gap-4 to gap-6

**Grid Structure:**
- Container: max-w-7xl with px-6
- Dashboard grid: 3-column on desktop (lg:grid-cols-3), 1-column mobile
- Content area: 2-column sidebar layout (70/30 split)

### Navigation System

**Desktop Top Navigation:**
- Height: 72px (h-18)
- Background: White with border-b
- Logo left, navigation center, user profile right
- Shadow: subtle on scroll (shadow-sm)
- Navigation links: font-weight 500, spacing px-6
- Active state: Garnet underline (border-b-2)

**Mobile Bottom Navigation:**
- Height: 64px, fixed bottom
- 4-5 primary items with icons + labels
- Active state: Garnet icon color with Gold accent dot
- Background: White with shadow-lg

### Component Library

**Cards:**
- Border-radius: 0.75rem (rounded-xl)
- Shadow: shadow-sm default, shadow-md on hover
- Background: white
- Padding: p-6
- Border: Optional 1px border in light gray for definition
- Card headers: pb-4 with border-b

**Buttons:**
- Primary (Garnet): py-3 px-6, rounded-lg, font-weight 500
- Secondary (White + Garnet border): Same sizing
- Ghost: Garnet text, no background
- On images: backdrop-blur-md with white/20 background, white text

**Data Display:**
- Tables: Striped rows (alternate bg-gray-50), header with Garnet text
- Stats cards: Large number (2.5rem Outfit), label below (DM Sans small)
- Badges: rounded-full, px-3 py-1, text-xs font-medium
- Progress bars: h-2 rounded-full, Garnet fill

**Forms:**
- Input height: h-12
- Border: 1px solid gray-300, rounded-lg
- Focus state: Garnet border, Gold ring (ring-2)
- Labels: font-weight 500, mb-2, text-sm

### Page Structure

**Hero Section (Dashboard/Home):**
- Height: 400px on desktop, 300px mobile
- Full-width background image showing school campus/students
- Dark overlay (bg-black/40) for text readability
- Centered content: Welcome message (H1 white) + quick stats row
- CTA buttons with blur backgrounds below headline

**Dashboard Layout:**
- Grid: 3 cards across (Upcoming Classes, Assignments, Announcements)
- Sidebar: Calendar widget + Quick Links
- Recent Activity feed: Timeline style with left border accent
- Each section with clear H3 heading + "View All" link in Garnet

**Content Pages:**
- Two-column: Main content (2/3) + sidebar (1/3)
- Breadcrumbs at top with slash separators
- Page title (H1) + description paragraph
- Content in cards with consistent spacing

### Images Section

**Hero Image:**
- Full-width campus scene or students studying
- Should convey academic excellence and community
- Professional photography, not stock-looking
- Dimensions: 1920x400px minimum

**Dashboard Cards:**
- Small icons (64x64px) for quick action cards
- Teacher profile photos in circular frames (48x48px)
- Class thumbnails in assignment cards (120x80px)

**Empty States:**
- Simple illustrations (not photos) when no data
- Centered, max-width 320px

### Atmospheric Elements

**White Space:** Generous padding between sections (py-20) creates premium feel
**Shadows:** Layered approach - cards float subtly above background
**Borders:** Minimal use - only for definition when needed
**Icons:** Heroicons or Material Icons, 20-24px size, Garnet color for active states
**Dividers:** 1px gray-200, use sparingly

### Quality Standards
- All interactive elements have clear hover states
- Loading states: Skeleton screens with subtle animation
- Error states: Inline validation with clear messaging
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Accessibility: WCAG AA compliant, proper contrast ratios maintained with Garnet/Gold
- Consistent 8px base unit for all spacing decisions