import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { hasMain } from "@/xternal-to-main";
import { appSettings } from "@/store/9-ui-state";
import { allFileUsChanges } from "@/store/1-file-mani-atoms";

export function useBeforeUnload(): void {
    const { confirmExit } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (hasMain()) {
        return;
    }

    // const once = useRef(false); // OK but will subscribe only once and unsubscribe twice
    useEffect(
        () => {
            if (!confirmExit) {
                return;
            }
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
        }, [confirmExit]
    );
}
