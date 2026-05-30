import { useEffect, useRef } from "react";

export function useIdleTimeout(onIdle: () => void, timeoutMs = 5 * 60 * 1000) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const reset = () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(onIdle, timeoutMs);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
        events.forEach(e => window.addEventListener(e, reset));
        reset();
        return () => {
            events.forEach(e => window.removeEventListener(e, reset));
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);
}