# Affinordic Claim - V1 to V2 Changes

## Overview
This document outlines the changes made between Version 1 and Version 2 of the Affinordic Claim project. The update focuses on improved typography, enhanced color system, and better performance optimization.

## File Structure Changes

### New Files Added
- **`fonts/` directory** - Added to V2
  - `FHLecturisRounded-Regular-edited.woff2` (28KB) - Custom font file
  - `GolosText-VariableFont_wght.ttf` (174KB) - Variable font file

### Files Removed
- No files were removed from V1 to V2

## Typography System Overhaul

### Font Loading Changes
**V1:**
- Used Google Fonts (Open Sans) loaded via WebFont.js
- External font loading with preconnect links

**V2:**
- Implemented custom font loading via `@font-face` declarations
- Added two custom fonts:
  - **Fh Lecturis Rounded** - Custom brand font
  - **Golos Text** - Variable font with weight range 400-900
- Removed external Google Fonts dependency
- Improved font loading performance with `font-display: swap`

### Font Implementation
```css
/* V2 - Custom Font Declarations */
@font-face {
  font-family: Fh lecturis rounded;
  src: url('../fonts/FHLecturisRounded-Regular-edited.woff2') format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Golos text;
  src: url('../fonts/GolosText-VariableFont_wght.ttf') format("truetype");
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}
```

## Color System Enhancement

### New Brand Color Palette
**V2 introduces a comprehensive brand color system:**

#### Primary Brand Colors
- `--brand--white: #f0f0f5`
- `--brand--affinordic-vibrant-blue: #230fc8`
- `--brand--affinordic-green: #bffdd0`
- `--brand--affinordic-dark-blue: #010141`
- `--brand--black: #140f28`
- `--brand--affinordic-light-blue: #9ecfff`
- `--brand--affinordic-dark-green: #0f4619`

#### Color Variations System
V2 implements a sophisticated color variation system using CSS `color-mix()`:
- **Affinordic Dark Blue variations** (100-800)
- **Affinordic Light Blue variations** (100-800)
- **Affinordic Vibrant Blue variations** (100-800)
- **Affinordic Green variations** (100-700)

#### Material Design Integration
Enhanced Material Design color scheme integration:
- Updated surface colors
- Improved contrast ratios
- Better accessibility compliance

## CSS Architecture Improvements

### File Size Optimization
- **V1 CSS:** 85KB (3,794 lines)
- **V2 CSS:** 79KB (3,517 lines)
- **Reduction:** 6KB (277 lines removed)

### Code Organization
- Better variable organization with clear sections
- Separated used vs unused variables
- Improved commenting and documentation

### Performance Enhancements
- Removed unused CSS rules
- Optimized selectors
- Better cascade management

## HTML Structure Changes

### Head Section Modifications
**Removed from V2:**
```html
<!-- V1 - Google Fonts Loading -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
<script type="text/javascript">WebFont.load({  google: {    families: ["Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"]  }});</script>
```

**V2 now uses:**
- Custom font declarations in CSS
- No external font loading dependencies
- Improved loading performance

### File Size Changes
- **V1 index.html:** 108KB (1,099 lines)
- **V2 index.html:** 182KB (1,279 lines)
- **Increase:** 74KB (180 lines added)

## Style Guide Updates

### Style Guide File Changes
- **V1 style-guide.html:** 133KB (1,767 lines)
- **V2 style-guide.html:** 122KB (1,644 lines)
- **Reduction:** 11KB (123 lines removed)

## Technical Improvements

### Accessibility Enhancements
- Better focus states
- Improved color contrast
- Enhanced keyboard navigation

### Performance Optimizations
- Reduced external dependencies
- Optimized font loading
- Streamlined CSS

### Browser Compatibility
- Enhanced cross-browser support
- Better fallback handling
- Improved mobile responsiveness

## Summary of Key Benefits

1. **Performance:** Faster loading with local fonts and reduced dependencies
2. **Brand Consistency:** Comprehensive color system with brand-specific palette
3. **Maintainability:** Better organized CSS with clear variable structure
4. **Accessibility:** Improved contrast and focus states
5. **Scalability:** Modular color system for future design iterations

## Migration Notes

When migrating from V1 to V2:
1. Ensure custom fonts are properly loaded
2. Update any hardcoded color values to use new CSS variables
3. Test font rendering across different browsers
4. Verify accessibility compliance with new color system
5. Update any external references to removed dependencies

---

*Last Updated: December 2024*
*Version: V1 to V2 Comparison* 
