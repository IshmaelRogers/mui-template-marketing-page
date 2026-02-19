# System Architecture Documentation

## Project Overview

This is a **Material-UI (MUI) Marketing Page Template** - a production-ready, single-page React application designed to showcase a product or service. It was imported from the official Material-UI repository (tag v7.3.8) and provides a complete marketing landing page with modern design patterns.

**Purpose**: Provide a ready-to-use marketing page template with customizable components, responsive design, and light/dark mode support.

**Technology Stack**:
- React (with TypeScript and JavaScript support)
- Material-UI v7.3.8
- Styled components via MUI's `styled` API
- CSS Variables for theming

## Directory Structure

```
/
├── MarketingPage.tsx       # Main TypeScript entry component
├── MarketingPage.js        # Main JavaScript entry component (mirrors .tsx)
├── components/             # Page section components
│   ├── AppAppBar.tsx/.js   # Fixed navigation header
│   ├── Hero.tsx/.js        # Hero section with call-to-action
│   ├── LogoCollection.tsx/.js  # Partner/client logo display
│   ├── Features.tsx/.js    # Product features showcase (interactive)
│   ├── Testimonials.tsx/.js    # Customer testimonials
│   ├── Highlights.tsx/.js  # Key product highlights
│   ├── Pricing.tsx/.js     # Pricing tiers
│   ├── FAQ.tsx/.js         # Frequently asked questions
│   ├── Footer.tsx/.js      # Page footer
│   └── SitemarkIcon.tsx/.js    # Custom logo/brand icon
├── shared-theme/           # Theming and styling system
│   ├── AppTheme.tsx/.js    # Main theme provider wrapper
│   ├── ColorModeSelect.tsx/.js     # Color mode selector
│   ├── ColorModeIconDropdown.tsx/.js   # Color mode icon dropdown
│   ├── themePrimitives.ts/.js  # Color palettes and design tokens
│   └── customizations/     # Component-specific style overrides
│       ├── inputs.tsx/.js      # Input component customizations
│       ├── dataDisplay.tsx/.js # Data display component customizations
│       ├── feedback.tsx/.js    # Feedback component customizations
│       ├── navigation.tsx/.js  # Navigation component customizations
│       └── surfaces.ts/.js     # Surface component customizations
└── README.md               # Basic project information
```

## Architecture

### 1. Main Entry Point

**File**: `MarketingPage.tsx` (and `MarketingPage.js`)

**Purpose**: The root component that composes all page sections into a complete marketing page.

**Structure**:
```
AppTheme (theming wrapper)
└── CssBaseline (normalize styles)
    ├── AppAppBar (sticky header)
    ├── Hero (hero section)
    └── div (main content)
        ├── LogoCollection
        ├── Features
        ├── Divider
        ├── Testimonials
        ├── Divider
        ├── Highlights
        ├── Divider
        ├── Pricing
        ├── Divider
        ├── FAQ
        ├── Divider
        └── Footer
```

**Key Feature**: Accepts a `disableCustomTheme` prop to optionally disable custom theming.

### 2. Component Organization

All components follow a consistent pattern:

#### Component Types:

1. **AppAppBar** (Navigation)
   - Fixed position app bar with mobile drawer
   - Integrates color mode switcher
   - Responsive navigation menu
   - Uses styled components for custom styling

2. **Hero** (Landing Section)
   - Email capture form
   - Call-to-action buttons
   - Background image with light/dark variants
   - Responsive layout with Stack and Container

3. **LogoCollection** (Trust Indicators)
   - Displays partner/client logos
   - Simple grid layout
   - Grayscale filter effect

4. **Features** (Product Showcase)
   - Interactive feature cards
   - Tab-like selection with chips
   - Image previews for each feature
   - Light/dark mode image variants

5. **Testimonials** (Social Proof)
   - Customer testimonial cards
   - Avatar, name, and occupation
   - Grid layout
   - Highlighted variant for emphasis

6. **Highlights** (Key Benefits)
   - Icon-based feature list
   - Icon + title + description format
   - Two-column responsive layout

7. **Pricing** (Plans)
   - Pricing tier cards
   - Feature lists with checkmarks
   - Call-to-action buttons
   - Highlighted popular plan

8. **FAQ** (Support)
   - Accordion-based Q&A
   - Expandable/collapsible sections
   - Support link

9. **Footer** (Site Info)
   - Multi-column layout
   - Product links, company info, legal links
   - Copyright and sitemark

### 3. Theming System

**Location**: `shared-theme/` directory

**Core Files**:

#### AppTheme.tsx
- Main theme provider component
- Creates MUI theme with custom configurations
- Enables CSS Variables mode
- Merges all component customizations
- Supports light/dark color schemes

#### themePrimitives.ts
- **Color Palettes**: `brand`, `gray`, `green`, `orange`, `red` color ranges (50-900)
- **Color Schemes**: Light and dark mode definitions
- **Typography**: Font family, sizes, and weights
- **Shadows**: Custom shadow definitions
- **Shape**: Border radius settings

#### Customization Files (`customizations/` directory)

Each file exports theme overrides for specific component categories:

1. **inputs.tsx**: Button, TextField, Checkbox, ToggleButton, etc.
   - Custom focus states
   - Border styles
   - Color variants
   - Disabled states

2. **dataDisplay.tsx**: Chip, Typography, List
   - Typography variants
   - Chip styles
   - List item customizations

3. **feedback.tsx**: Alert, Dialog, Progress indicators
   - Alert severity variants
   - Dialog styling
   - Loading indicators

4. **navigation.tsx**: Menu, MenuItem, Tab components
   - Menu paper styles
   - Active states
   - Hover effects

5. **surfaces.ts**: Card, Paper, Accordion
   - Card variants (outlined, highlighted)
   - Accordion customizations
   - Surface elevation

**Theme Features**:
- CSS Variables support with `--template-` prefix
- Color scheme selector: `data-mui-color-scheme`
- Automatic light/dark mode switching
- Theme components can be overridden via props

### 4. Color Mode System

**Components**: `ColorModeSelect.tsx`, `ColorModeIconDropdown.tsx`

**Functionality**:
- Uses MUI's `useColorScheme` hook
- Three modes: `system`, `light`, `dark`
- Persisted across sessions
- Integrated into AppAppBar

**Implementation**:
- ColorModeSelect: Dropdown select component
- ColorModeIconDropdown: Icon-based dropdown for toolbar

### 5. Styling Approach

**Pattern**: Styled Components + MUI System

**Example**:
```typescript
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  // ...
}));
```

**Key Techniques**:
- `styled()` API for custom components
- `sx` prop for inline styles
- Theme-aware styling with `theme.vars`
- `applyStyles('dark', {...})` for dark mode variants
- Alpha blending for translucent effects

### 6. TypeScript/JavaScript Dual Support

**Pattern**: Every component exists in both `.tsx` and `.js` versions

**Why**: 
- Supports both TypeScript and JavaScript projects
- Identical functionality in both versions
- TypeScript adds type safety and better IDE support

**Differences**:
- `.tsx` files include type annotations
- `.js` files omit types but maintain same logic
- Import paths are the same (extension resolution handled by bundler)

## Data Flow

### State Management
- **Local State**: Each component manages its own state with `React.useState`
- **No Global State**: No Redux, Context, or other state management libraries
- **Theme State**: Managed by MUI's color scheme system

### Component Communication
- **Props**: Parent → Child communication
- **Callbacks**: Child → Parent communication (e.g., form submissions)
- **No Direct Communication**: Components are independent sections

### External Dependencies
- **Images**: Uses `process.env.TEMPLATE_IMAGE_URL` or falls back to `mui.com` CDN
- **Icons**: Material Icons from `@mui/icons-material`

## Key Design Patterns

### 1. Component Composition
Each section is a self-contained component that can be reordered or removed without breaking the page.

### 2. Responsive Design
- Mobile-first approach
- Breakpoint usage: `xs`, `sm`, `md`, `lg`, `xl`
- Responsive spacing and typography
- Mobile drawer for navigation

### 3. Theme-Aware Components
All components adapt to light/dark mode automatically through:
- `theme.applyStyles('dark', {...})` for explicit dark mode styles
- Theme color tokens: `theme.palette.primary.main`, etc.
- CSS variables: `var(--template-*)`

### 4. Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- `visuallyHidden` utility for screen readers
- Focus indicators on interactive elements

## How to Use This Template

### Basic Usage
```typescript
import MarketingPage from './MarketingPage';

function App() {
  return <MarketingPage />;
}
```

### Disable Custom Theme
```typescript
<MarketingPage disableCustomTheme />
```

### Customization Points

1. **Colors**: Edit `shared-theme/themePrimitives.ts` to change color palettes
2. **Content**: Edit individual component files to change text, images, links
3. **Layout**: Reorder sections in `MarketingPage.tsx`
4. **Styling**: Override component styles in `customizations/` files
5. **Add Sections**: Create new components in `components/` and add to MarketingPage

## Code Statistics

- **Total Lines**: ~2,700 lines of TypeScript/JavaScript
- **Components**: 10 main components (20 files with JS/TS variants)
- **Theme Files**: 5 customization modules
- **Supported Languages**: TypeScript and JavaScript

## Dependencies

**Core**:
- `@mui/material` (v7.3.8+)
- `@mui/icons-material`
- `react`

**No Build Configuration**: This template doesn't include build configuration (webpack, vite, etc.). It's designed to be integrated into an existing React project.

## Best Practices for Modification

1. **Maintain Dual Support**: When editing, update both `.tsx` and `.js` versions
2. **Theme Consistency**: Use theme tokens instead of hardcoded colors
3. **Responsive Design**: Always test on mobile, tablet, and desktop viewports
4. **Component Independence**: Keep components self-contained
5. **Accessibility**: Maintain ARIA labels and semantic HTML
6. **Performance**: Use `React.useMemo` for expensive theme calculations (see AppTheme)

## Common Modification Scenarios

### Change Brand Colors
Edit `shared-theme/themePrimitives.ts`:
```typescript
export const brand = {
  50: 'hsl(210, 100%, 95%)',  // Lightest
  // ... adjust HSL values
  900: 'hsl(210, 100%, 21%)', // Darkest
};
```

### Add a New Section
1. Create component in `components/NewSection.tsx` and `.js`
2. Import in `MarketingPage.tsx`
3. Add to JSX with surrounding `<Divider />` if needed

### Customize Component Styles
Edit the appropriate file in `shared-theme/customizations/`:
- Buttons → `inputs.tsx`
- Cards → `surfaces.ts`
- Dialogs → `feedback.tsx`

### Change Images
Replace the `process.env.TEMPLATE_IMAGE_URL` references with your own image URLs or use relative paths.

## Environment Variables

- `TEMPLATE_IMAGE_URL`: Base URL for template images (defaults to `https://mui.com`)

## Notes for AI Agents

When making changes to this codebase:

1. **Dual Files**: Remember to update both `.tsx` and `.js` versions
2. **Theme System**: Use the existing theme system rather than inline colors
3. **Component Structure**: Follow the established pattern of styled components + MUI components
4. **No Tests**: This template doesn't include tests
5. **No Build System**: No package.json, webpack, or other build configuration
6. **Responsive**: Always consider mobile, tablet, and desktop breakpoints
7. **Accessibility**: Maintain existing accessibility features
8. **Light/Dark Mode**: Test changes in both color modes
