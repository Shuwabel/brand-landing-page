# Animation Restoration Report

## Issue
The user reported that the recent speed optimizations made the experience "choppy" instead of smooth.

## Actions
1. **Intro.tsx**: Reverting animations to slower, smoother durations (e.g., 1.5s - 2s) to restore the premium feel.
2. **IntroSm.tsx**: High-speed durations caused frame drops or jarring transitions. Reverting to original pacing.
3. **Scroll**: I did not explicitly touch scroll physics (Lenis is used), but if the Intro unmount and layout shifts are too abrupt, it can affect perceived smoothness. I will ensure the transition is gentle.

## Plan
- Restore `duration` values in `Intro.tsx` and `IntroSm.tsx` to their original longer values.
- Verify `useLenis` is still active and configured correctly.
