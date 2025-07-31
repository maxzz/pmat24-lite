import { useEffect } from "react";

export function useBeforeUnload(): void {
    // const once = useRef(false); // OK but will subscribe only once and unsubscribe twice
    useEffect(
        () => {
            // if (once.current) { return; } once.current = true;

            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                // console.log('%c ⭐⭐⭐⭐⭐⭐⭐ beforeunload: invoked', 'color: red; font-size:0.55rem');
                event.preventDefault();
                return '';
            };

            // console.log('%c ⭐ beforeunload: addEventListener', 'color: orange; font-size:0.55rem');

            const controller = new AbortController();
            window.addEventListener("beforeunload", handleBeforeUnload, { signal: controller.signal });

            return () => {
                // console.log('%c ⭐ beforeunload: removeEventListener', 'color: blue; font-size:0.55rem');
                controller.abort();
            };
        }, []
    );
}
