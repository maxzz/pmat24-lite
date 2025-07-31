import { useEffect, useRef } from "react";

export function useBeforeUnload(): void {
    const once = useRef(false);
    useEffect(
        () => {
            if (once.current) {
                return;
            }
            once.current = true;

            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                console.log('%c ⭐⭐⭐⭐⭐⭐⭐ beforeunload: invoked', 'color: red; font-size:0.55rem');
                //event.preventDefault();
                //event.returnValue = true;
                const message = "Are you sure you want to leave?";
                return message;

                //event.preventDefault();
                // return ''; //https://github.com/Krishnagopal-Sinha/better-nothing-glyph-composer/blob/main/src/App.tsx#L28
            };

            //console.log('%c ⭐ beforeunload: addEventListener', 'color: orange; font-size:0.55rem');

            const controller = new AbortController();
            window.addEventListener("beforeunload", handleBeforeUnload, { signal: controller.signal });

            return () => {
                controller.abort();
            };
        }, []
    );
}
