import { useEffect } from "react";
import { hasMain } from "@/xternal-to-main";
import { allFileUsChanges } from "@/store";

export function useBeforeUnload(): void {
    if (hasMain()) {
        return;
    }

    // const once = useRef(false); // OK but will subscribe only once and unsubscribe twice
    useEffect(
        () => {
            // if (once.current) { return; } once.current = true;

            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                if (!allFileUsChanges.size) {
                    return;
                }

                event.preventDefault();
                return '';
            };

            const controller = new AbortController();
            window.addEventListener("beforeunload", handleBeforeUnload, { signal: controller.signal });

            return () => {
                controller.abort();
            };
        }, []
    );
}
