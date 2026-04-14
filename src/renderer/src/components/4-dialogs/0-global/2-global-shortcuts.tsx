import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { isRootDirEmpty } from "@/store/5-1-open-files";
import { debugSettings } from "@/store/9-ui-state";
import { zoomActionAtom } from "@/store/9-ui-state/8-app-ui";
import { doSaveRightPanelFileAtom, doSaveAllAtom } from "@/store/0-serve-atoms";
import { doOpenOptionsDialogAtom, sawMonitor_doOpenAtom, filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { hasMain } from "@/xternal-to-main";

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpen_SawMonitor = useSetAtom(sawMonitor_doOpenAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);
    const doZoom = useSetAtom(zoomActionAtom);

    useEffect(() => {
        appShortcuts.openOptions.action = () => doOpenOptionsDialog(true);
        appShortcuts.openFilter.action = () => doOpenFilterDialog(true);
        appShortcuts.openCreate.action = () => doOpen_SawMonitor();
        appShortcuts.saveOne.action = () => doSaveOneIfNotNull();
        appShortcuts.saveAll.action = () => doSaveAll();
        appShortcuts.toggleDbg.action = () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;

        appShortcuts.zoomIn.action = () => doZoom('in');
        appShortcuts.zoomOut.action = () => doZoom('out');
        appShortcuts.zoomReset.action = () => doZoom('reset');
    }, []);

    useKeyNew();

    return null;
}

const blankKeys = ['Control', 'Alt', 'Shift'];

const useKeyNew = () => {
    const useMemoHandler = useCallback(
        (event: KeyboardEvent) => {
            if (blankKeys.includes(event.key)) { // All keys require Ctrl, Alt, Shift to be pressed
                return;
            }

            const [key, shortcut] = (Object.entries(appShortcuts).find(
                ([_key, value]) => (value.noNeedRootDir ? true : !isRootDirEmpty()) && value.is(event)
            ) || []) as [ShortcustKey, Shortcut];

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

// Shortcut keys definitions

type ShortcustKey = 'openOptions' | 'openFilter' | 'openCreate' | 'saveOne' | 'saveAll' | 'toggleDbg' | 'zoomIn' | 'zoomOut' | 'zoomReset';
type Shortcut = {
    text: string;                                           // Display text for the shortcut
    is: (event: KeyboardEvent) => boolean;                  // Function to check if the keyboard event matches this shortcut
    action?: (event: KeyboardEvent, shortcut: ShortcustKey) => void; // Function to execute when the shortcut is triggered
    noNeedRootDir?: boolean;                                // Whether this shortcut requires a non-empty root directory
};

export const appShortcuts: Record<ShortcustKey, Shortcut> = {
    openOptions: {                                          // Open settings dialog
        text: "Ctrl+,",
        is: (e) => e.ctrlKey && e.key === ',',              // or return () => false
        noNeedRootDir: true,
    },
    openFilter: {                                           // Filter manifest list
        text: hasMain() ? "Ctrl+F" : "Ctrl+Shift+F",
        is: hasMain() ? (e) => e.ctrlKey && e.key === 'f' : (e) => e.ctrlKey && e.shiftKey && e.key === 'F',
    },
    openCreate: {                                           // Create new manifest
        text: hasMain() ? "Ctrl+N" : "Alt+N",
        is: hasMain() ? (e) => e.ctrlKey && e.key === 'n' : (e) => e.altKey && e.key === 'n',
        noNeedRootDir: true,
    },
    saveOne: {                                              // Save current manifest. Ctrl+S is already taken by browser
        text: hasMain() ? "Ctrl+S" : "Ctrl+Alt+S",
        is: hasMain() ? (e) => e.ctrlKey && e.key === 's' : (e) => e.ctrlKey && e.altKey && e.key === 's',
    },
    saveAll: {                                              // Save all manifests; Ctrl+Shift+S is already taken by Edge browser
        text: hasMain() ? "Alt+S" : "Ctrl+Shift+S",
        is: hasMain() ? (e) => e.altKey && e.key === 's' : (e) => e.ctrlKey && e.shiftKey && e.key === 'S',
    },
    toggleDbg: {
        text: 'Ctrl+Alt+Shift+D',
        is: (e) => e.ctrlKey && e.altKey && e.key === 'D',
        noNeedRootDir: true,
    },
    zoomIn: {
        text: "Ctrl++",
        is: (e) => hasMain() && e.ctrlKey && (e.key === '+' || e.key === '=' || e.code === 'NumpadAdd'),
        noNeedRootDir: true,
    },
    zoomOut: {
        text: "Ctrl+-",
        is: (e) => hasMain() && e.ctrlKey && (e.key === '-' || e.key === '_' || e.code === 'NumpadSubtract'),
        noNeedRootDir: true,
    },
    zoomReset: {
        text: "Ctrl+0",
        is: (e) => hasMain() && e.ctrlKey && (e.key === '0' || e.code === 'Numpad0'),
        noNeedRootDir: true,
    },
};
