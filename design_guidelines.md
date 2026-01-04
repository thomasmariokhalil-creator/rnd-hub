# RND Hub - High School Student Hub Design Guidelines

## Design Approach
**System Selected:** Material Design 3 with dashboard patterns (inspired by Google Classroom, Notion student workspaces)
**Rationale:** Student-focused utility application requiring intuitive navigation, information density, and long-term usability. Clean, professional aesthetic that students and educators trust.

---

## Core Layout Architecture

**Primary Structure:**
- Left sidebar navigation (280px wide desktop, collapsible to 72px icon-only)
- Top app bar (64px height) with breadcrumbs, search, and user profile
- Main content area with card-based content grid
- Mobile: Bottom navigation bar + hamburger menu for sidebar

**Content Area Layout:**
- Dashboard grid: 2-column on desktop (lg:grid-cols-2), single column mobile
- Card system for modules: Assignments, Schedule, Resources, Announcements
- Quick stats bar at top: 4-column metrics (Pending Tasks, Upcoming Events, GPA, Attendance)

---

## Typography System

**Font Selection:**
- Primary: Inter (via Google Fonts) - headings, UI elements
- Secondary: system-ui fallback for body text

**Hierarchy:**
- Page titles: text-3xl, font-bold (32px)
- Section headers: text-xl, font-semibold (20px)
- Card titles: text-lg, font-medium (18px)
- Body text: text-base, font-normal (16px)
- Caption/metadata: text-sm (14px)
- Small labels: text-xs (12px)

---

## Spacing System

**Tailwind Units:** Primarily use 2, 4, 6, 8, 12, 16, 24
- Card padding: p-6
- Section spacing: mb-8, mt-6
- Grid gaps: gap-6
- Element spacing: space-y-4
- Sidebar padding: p-4

---

## Component Library

### Navigation Components
**Sidebar:**
- Logo area at top (h-16)
- Navigation items with icons (left-aligned, w-full, py-3, px-4, rounded-lg)
- Active state indicator (left border accent, 4px width)
- Grouped sections: Dashboard, Classes, Resources, Community, Settings
- User profile card at bottom with avatar and name

**Top Bar:**
- Search bar (max-w-xl, rounded-full)
- Notification bell icon with badge
- Profile avatar (h-10 w-10, rounded-full)

### Dashboard Cards
**Card Structure:**
- Rounded corners (rounded-xl)
- Subtle elevation (shadow-sm)
- Header with icon + title + action button
- Content area with list items or grid
- Optional footer with "View All" link

**Card Types:**
1. **Assignment Card:** List view with due dates, status tags, subject labels
2. **Schedule Card:** Timeline view of today's/upcoming classes
3. **Resource Card:** Grid of subject folders with document counts
4. **Announcement Card:** Feed-style with timestamps and avatars

### Interactive Elements
**Buttons:**
- Primary: Filled, rounded-lg, px-6, py-3, font-medium
- Secondary: Outlined, same dimensions
- Text buttons: No border, hover underline
- Icon buttons: Square (h-10 w-10), rounded-lg

**Tags/Chips:**
- Rounded-full, px-3, py-1, text-sm
- Usage: Subject labels, status indicators, priority flags

**Input Fields:**
- Search: rounded-full with icon prefix
- Forms: rounded-lg, border, py-3, px-4
- Focus states: ring-2 offset treatment

---

## Images

**Hero Image Section:**
No traditional hero. Use a **dashboard banner** instead:
- Position: Top of main content area, full-width
- Dimensions: h-48 (192px height)
- Content: Inspirational education-themed graphic (students collaborating, books, digital learning)
- Overlay: Gradient overlay (bottom-to-top fade) with welcome message
- Text placement: Bottom-left, p-8
- Include: "Welcome back, [Student Name]" + motivational quote
- Button: Glass-morphism CTA ("Start Today's Tasks") with backdrop-blur-md

**Additional Images:**
- Subject folder icons: Colorful illustrated icons per subject (Math, Science, English, etc.)
- Empty states: Friendly illustrations when no assignments/content
- Profile avatars: Circular placeholders throughout

---

## Page-Specific Layouts

### Dashboard (Home)
- Quick stats bar (4 metrics in grid)
- Dashboard banner with image
- 2-column card grid: Left (Assignments, Resources), Right (Schedule, Announcements)

### Class Detail Page
- Header: Class title, teacher info, class code
- Tab navigation: Stream, Classwork, People, Grades
- Content cards based on active tab
- Floating action button for quick post/assignment

### Resource Library
- Breadcrumb navigation
- Grid view toggle (list/grid)
- 3-column grid (lg:grid-cols-3) of folder cards
- Each card: Icon, title, item count, last updated

---

## Responsive Behavior

**Desktop (lg:):** Full sidebar + 2-3 column grids
**Tablet (md:):** Collapsible sidebar + 2 column grids
**Mobile:** Hidden sidebar + bottom nav + single column, stack all cards

---

## Key Design Principles
1. **Information Clarity:** Dense content without clutter
2. **Quick Actions:** Everything max 2 clicks away
3. **Visual Hierarchy:** Clear scanning pattern (F-pattern)
4. **Consistent Spacing:** Maintain rhythm with defined spacing units
5. **Student-Friendly:** Approachable but professional tone