# Magnetic Scroll System

## Overview

The BRINIMAL site now features a **magnetic scroll system** that provides a smooth, app-like navigation experience. Sections automatically snap into place when users stop scrolling, creating a polished and intentional browsing experience.

## How It Works

### 1. Automatic Section Detection
The system continuously monitors which section is closest to the viewport center and automatically snaps to it when scrolling stops.

### 2. Smart Snapping
- **Scroll Detection**: Detects when user stops scrolling (150ms delay)
- **Position Calculation**: Finds the nearest section based on viewport center
- **Smooth Animation**: Animates to the target section with easing (0.8s duration)
- **Lock During Animation**: Prevents multiple snaps from conflicting

### 3. Multiple Input Methods

#### Mouse/Trackpad
- Natural scrolling with auto-snap on stop
- Wheel events trigger magnetic behavior after 200ms

#### Keyboard Navigation
- **Arrow Down / Page Down**: Next section
- **Arrow Up / Page Up**: Previous section
- **Home**: Jump to first section
- **End**: Jump to last section

#### Touch/Mobile
- Swipe up: Next section
- Swipe down: Previous section
- Minimum swipe distance: 50px

## Technical Implementation

### Core Files Modified

1. **`src/App.tsx`**
   - Added magnetic scroll logic with `setupMagneticScroll()`
   - Manages section tracking and snap animations
   - Handles multiple input methods

2. **`src/index.css`**
   - Disabled default scroll-snap behavior
   - Added performance optimizations:
     - `overscroll-behavior: none` - Prevents momentum interference
     - `backface-visibility: hidden` - GPU acceleration
     - `transform: translateZ(0)` - Layer promotion

3. **All Section Components**
   - Updated to `end: "+=100%"` for consistent scroll distances
   - Changed `scrub: 0.3` for responsive animations
   - Animation phases: 0-40% entrance, 40-60% settle, 60-100% exit

### Key Features

#### Prevention of Scroll Conflicts
```typescript
const isAnimatingRef = useRef(false);
const currentSectionRef = useRef(0);
```
- Tracks animation state to prevent overlapping snaps
- Maintains current section index for navigation

#### Intelligent Section Detection
```typescript
const getCurrentSection = () => {
  const currentViewCenter = scrollY + windowHeight / 2;
  // Finds closest section to viewport center
};
```

#### Smooth GSAP Animation
```typescript
gsap.to(window, {
  scrollTo: { y: targetY, autoKill: false },
  duration: 0.8,
  ease: "power2.inOut",
});
```

## User Experience Benefits

1. **Predictable Navigation**: Each section is a discrete unit
2. **Professional Feel**: Smooth, controlled animations
3. **Accessibility**: Keyboard navigation support
4. **Mobile Optimized**: Touch gestures work naturally
5. **No Fighting**: System doesn't interrupt active scrolling

## Configuration

### Timing Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Snap Delay | 150ms | Time to wait after scroll stops |
| Wheel Delay | 200ms | Debounce for wheel events |
| Snap Duration | 0.8s | Animation speed to target section |
| Animation Buffer | 300ms | Cooldown after snap completes |

### Customization

To adjust snap behavior, modify these values in `App.tsx`:

```typescript
// Snap delay after scrolling stops
setTimeout(() => { /* snap logic */ }, 150); // Change 150ms

// Snap animation speed
gsap.to(window, {
  duration: 0.8, // Change duration
  ease: "power2.inOut", // Change easing
});

// Touch swipe sensitivity
if (Math.abs(diff) > 50) // Change 50px threshold
```

## Performance Optimizations

1. **Passive Event Listeners**: No scroll blocking
2. **Debounced Events**: Prevents excessive calculations
3. **GPU Acceleration**: CSS transforms for smooth rendering
4. **Will-change Hints**: Optimizes layer composition
5. **Smart Timeouts**: Clears on cleanup to prevent memory leaks

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (Desktop & iOS)
- ✅ Mobile browsers
- ⚠️ Requires JavaScript enabled

## Troubleshooting

### Sections Not Snapping
- Check that sections have `.section-pinned` class
- Verify GSAP plugins are loaded
- Check browser console for errors

### Jumpy Behavior
- Reduce snap delay in `handleScrollEnd`
- Adjust `ease` value for smoother animation

### Too Slow/Fast
- Modify `duration: 0.8` in `snapToSection`
- Adjust scrub values in individual sections

### Mobile Issues
- Verify touch events aren't being blocked
- Check swipe threshold (currently 50px)
- Test with `passive: true` listeners

## Future Enhancements

Possible improvements:

1. **Progress Indicators**: Visual dots showing current section
2. **Section Transitions**: Cross-fade between sections
3. **Reduced Motion**: Respect `prefers-reduced-motion`
4. **URL Hash Updates**: Sync with browser history
5. **Analytics**: Track section engagement

## Related Files

- `src/App.tsx` - Main magnetic scroll implementation
- `src/index.css` - CSS optimizations
- `src/sections/*.tsx` - Individual section components with scroll animations
- `AGENTS.md` - Full project documentation