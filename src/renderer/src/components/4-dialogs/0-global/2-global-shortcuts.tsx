import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { isRootDirEmpty } from "@/store/1-atoms/1-files";
import { debugSettings } from "@/store/9-ui-state";
import { doSaveRightPanelFileAtom, doSaveAllAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { doOpenOptionsDialogAtom, open_SawMonitorAtom, filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { hasMain } from "@/xternal-to-main";

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpen_SawMonitor = useSetAtom(open_SawMonitorAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    useEffect(() => {
        appShortcuts.openOptions.action = () => doOpenOptionsDialog(true);
        appShortcuts.openFilter.action = () => doOpenFilterDialog(true);
        appShortcuts.openCreate.action = () => doOpen_SawMonitor();
        appShortcuts.saveOne.action = () => doSaveOneIfNotNull();
        appShortcuts.saveAll.action = () => doSaveAll();
        appShortcuts.toggleDbg.action = () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
    }, []);

    useKeyNew();

    return null;
}

type ShortcustKey = 'openOptions' | 'openFilter' | 'openCreate' | 'saveOne' | 'saveAll' | 'toggleDbg';
type Shortcut = { text: string; is: (event: KeyboardEvent) => boolean; action?: (event: KeyboardEvent, shortcut: ShortcustKey) => void; };

export const appShortcuts: Record<ShortcustKey, Shortcut> = {
    openOptions: {                                          // Open settings dialog
        text: "Ctrl+,",
        is: (event) => event.ctrlKey && event.key === ',',  // or return () => false
    },
    openFilter: {                                           // Filter manifest list
        text: hasMain() ? "Ctrl+F" : "Ctrl+Shift+F",
        is: hasMain() ? (event) => event.ctrlKey && event.key === 'f' : (event) => event.ctrlKey && event.shiftKey && event.key === 'F',
    },
    openCreate: {                                           // Create new manifest
        text: hasMain() ? "Ctrl+N" : "Alt+N",
        is: hasMain() ? (event) => event.ctrlKey && event.key === 'n' : (event) => event.altKey && event.key === 'n',
    },
    saveOne: {                                              // Save current manifest. Ctrl+S is already taken by browser
        text: hasMain() ? "Ctrl+S" : "Ctrl+Alt+S",
        is: hasMain() ? (event) => event.ctrlKey && event.key === 's' : (event) => event.ctrlKey && event.altKey && event.key === 's',
    },
    saveAll: {                                              // Save all manifests; Ctrl+Shift+S is already taken by Edge browser
        text: hasMain() ? "Alt+S" : "Ctrl+Shift+S",
        is: hasMain() ? (event) => event.altKey && event.key === 's' : (event) => event.ctrlKey && event.shiftKey && event.key === 'S',
    },
    toggleDbg: {
        text: 'Ctrl+Alt+Shift+D',
        is: (event) => event.ctrlKey && event.altKey && event.key === 'D',
    },
};

const blankKeys = ['Control', 'Alt', 'Shift'];

const useKeyNew = () => {
    const useMemoHandler = useCallback(
        (event: KeyboardEvent) => {
            if (isRootDirEmpty()) {
                return;
            }

            if (blankKeys.includes(event.key)) {
                return;
            }

            const [key, shortcut] = (Object.entries(appShortcuts).find(([_key, value]) => value.is(event)) || []) as [ShortcustKey, Shortcut];
            if (key && shortcut?.action) {
                event.preventDefault();
                shortcut?.action(event, key);
            }
        }, []
    );

    useEffect(
        () => {
            const controller = new AbortController();
            document.addEventListener('keydown', useMemoHandler, { signal: controller.signal });
            return () => {
                controller.abort();
            };
        }, [useMemoHandler]
    );
};
