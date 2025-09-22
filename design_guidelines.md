# BTC to INR Chart App Design Guidelines

## Design Decision Framework Analysis

**Project Type**: Utility-focused financial data visualization
**Content**: Information-dense price charts and data
**Industry**: Fintech/Financial tools (function-differentiated)
**Update Frequency**: Stability-valued for consistent usability
**Components**: Standard financial chart patterns sufficient

**Decision**: Design System Approach using Material Design for clean, data-focused interface

## Design Approach Documentation

**Selected Approach**: Material Design System
**Justification**: Financial data applications require clear hierarchy, readable typography, and intuitive navigation. Material Design provides excellent data visualization patterns and accessibility standards.

**Key Design Principles**:
- Data clarity over visual flourish
- Consistent interaction patterns
- High contrast for readability
- Responsive across all devices

## Core Design Elements

### A. Color Palette

**Light Mode**:
- Primary: 25 85% 53% (vibrant blue for active states)
- Background: 0 0% 98% (clean white-gray)
- Surface: 0 0% 100% (pure white for chart container)
- Text Primary: 0 0% 13% (near black)
- Text Secondary: 0 0% 46% (medium gray)
- Success: 142 76% 36% (green for positive price changes)
- Error: 0 84% 60% (red for negative price changes)

**Dark Mode**:
- Primary: 25 85% 63% (lighter blue for visibility)
- Background: 0 0% 7% (dark gray)
- Surface: 0 0% 12% (elevated dark surface)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 65% (light gray)
- Success: 142 69% 58% (lighter green)
- Error: 0 72% 70% (lighter red)

### B. Typography

**Font Family**: Inter via Google Fonts CDN
**Hierarchy**:
- Headline (Current Price): 32px, 600 weight
- Title (Chart Labels): 16px, 500 weight
- Body (Tab Labels): 14px, 400 weight
- Caption (Timestamps): 12px, 400 weight

### C. Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
**Container**: max-width-4xl with responsive padding
**Grid**: Single column layout with chart taking 70% height

### D. Component Library

**Tab Navigation**:
- Horizontal scrollable tabs on mobile
- Fixed width tabs on desktop
- Active state with primary color underline
- Subtle hover states

**Chart Container**:
- Rounded corners (rounded-lg)
- Subtle shadow (shadow-sm)
- Full-width responsive
- Min-height of 400px

**Price Display**:
- Large numerical display
- Color-coded percentage change
- Compact layout above chart

**Chart Styling**:
- Single color line graph using primary color
- Grid lines in text-secondary color
- Smooth curve interpolation
- Responsive axis labels

### E. Animations

**Minimal Approach**:
- Smooth tab transitions (300ms ease)
- Chart data transition on period change (500ms ease)
- No decorative animations
- Focus on functional feedback only

## Layout Structure

**Header Section**: Current BTC price and 24h change indicator
**Tab Navigation**: Horizontal tab bar with 6 time periods
**Chart Area**: Full-width responsive line chart
**Footer**: Minimal timestamp showing last update

## Accessibility Considerations

- High contrast ratios (4.5:1 minimum)
- Keyboard navigation for all tabs
- Screen reader friendly chart descriptions
- Consistent dark mode across all components
- Touch targets minimum 44px for mobile

## Responsive Behavior

**Mobile**: Stacked layout, scrollable tabs, simplified chart
**Tablet**: Optimized spacing, larger touch targets
**Desktop**: Full horizontal layout, hover states enabled

This utility-focused design prioritizes data clarity and usability over visual flair, ensuring users can quickly access and interpret BTC price information across all time periods.