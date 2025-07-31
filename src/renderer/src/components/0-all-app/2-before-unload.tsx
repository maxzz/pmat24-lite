import { useEffect, useRef } from "react";

export function useBeforeUnload(): void {
    // const once = useRef(false);
    useEffect(
        () => {
            // if (once.current) {
            //     return;
            // }
            // once.current = true;

            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                console.log('%c ⭐⭐⭐⭐⭐⭐⭐ beforeunload: invoked', 'color: red; font-size:0.55rem');
                event.preventDefault();
                // event.returnValue = true;

                // event.preventDefault();
                // // Chrome requires returnValue to be set for the dialog to appear
                event.returnValue = '';

                const message = "Are you sure you want to leave?";
                // // (event || window.event).returnValue = message;
                return message;

                //event.preventDefault();
                // return ''; //https://github.com/Krishnagopal-Sinha/better-nothing-glyph-composer/blob/main/src/App.tsx#L28
            };

            const handlePageHide = (event: PageTransitionEvent) => {
                console.log('%c ⭐⭐⭐⭐⭐⭐⭐ beforeunload: invoked', 'color: green; font-size:0.55rem', event);
                if (!event.persisted) {
                }
            }

            console.log('%c ⭐ beforeunload: addEventListener', 'color: orange; font-size:0.55rem');

            const controller = new AbortController();
            window.addEventListener("beforeunload", handleBeforeUnload, { signal: controller.signal });
            window.addEventListener("pagehide", handlePageHide, { signal: controller.signal });

            return () => {
                console.log('%c ⭐ beforeunload: removeEventListener', 'color: blue; font-size:0.55rem');
                controller.abort();
            };
        }, []
    );
}
