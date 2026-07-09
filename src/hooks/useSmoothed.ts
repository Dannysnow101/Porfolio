'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Eases a numeric value toward its latest target on every animation frame.
 *
 * Two things this buys us:
 *  - Scroll-linked motion (rotation, drift, counters) gets a subtle trailing
 *    "catch up" feel instead of rigidly snapping to the scroll position, so
 *    the page keeps feeling alive even while the user briefly pauses mid-scroll.
 *  - One-shot values (like a mobile "now in view" trigger that jumps 0 -> 1)
 *    get a natural animated transition instead of an instant, jarring jump.
 */
export function useSmoothed(target: number, factor = 0.12) {
    const [value, setValue] = useState(target);
    const valueRef = useRef(target);
    const targetRef = useRef(target);
    targetRef.current = target;

    useEffect(() => {
        let rafId: number;

        const tick = () => {
            const diff = targetRef.current - valueRef.current;
            if (Math.abs(diff) > 0.0008) {
                valueRef.current += diff * factor;
                setValue(valueRef.current);
            } else if (valueRef.current !== targetRef.current) {
                valueRef.current = targetRef.current;
                setValue(valueRef.current);
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [factor]);

    return value;
}
