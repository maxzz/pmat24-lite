import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { isRootDirEmpty } from "@/store";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { doSaveRightPanelFileAtom, doSaveAllAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { doOpenOptionsDialogAtom, doOpenSawOverlayForLoginAtom, filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { hasMain } from "@/xternal-to-main";

export const shortcutNameSettings /**/ = hasMain() ? "Ctrl+," : "";                         // Open settings dialog
export const shortcutNameFilter   /**/ = hasMain() ? "Ctrl+F" : "Ctrl+Shift+F";             // Filter manifest list
export const shortcutNameCreate   /**/ = hasMain() ? "Ctrl+N" : "";                         // Create new manifest
export const shortcutNameSave     /**/ = hasMain() ? "Ctrl+S" : "Ctrl+Alt+S";               // Save current manifest. Ctrl+S is already taken by browser
export const shortcutNameSaveAll  /**/ = hasMain() ? "Ctrl+Shift+S" : "";                   // Save all manifests; Ctrl+Shift+S is already taken by Edge browser

type ShortcustKey = 'openOptionsDialog' | 'openFilterDialog' | 'openCreateDialog' | 'saveOneIfNotNull' | 'saveAll' | 'toggleDebug';
type Shortcut = { text: string; is: (event: KeyboardEvent) => boolean; action?: (event: KeyboardEvent, shortcut: ShortcustKey) => void; };

const shortcusts: Record<ShortcustKey, Shortcut> = {
    openOptionsDialog: {
        text: 'Ctrl+,',
        is: (event) => event.ctrlKey && event.key === ',',
    },
    openFilterDialog: {
        text: 'Ctrl+F',
        is: (event) => event.ctrlKey && event.key === 'f',
    },
    openCreateDialog: {
        text: 'Alt+N',
        is: (event) => event.altKey && event.key === 'n',
    },
    saveOneIfNotNull: {
        text: 'Ctrl+S',
        is: (event) => event.ctrlKey && event.key === 's',
    },
    saveAll: {
        text: 'Alt+S',
        is: (event) => event.altKey && event.key === 's',
    },
    toggleDebug: {
        text: 'Ctrl+Alt+Shift+D',
        is: (event) => event.ctrlKey && event.altKey && event.key === 'D',
    },
};

const useKeyNew = (key: (event: KeyboardEvent) => boolean, fn: (event: KeyboardEvent) => void,) => {
    // const useMemoHandler = useMemo(
    //     () => {
    //         const predicate: KeyPredicate = createKeyPredicate(key);
    //         const handler: Handler = (handlerEvent) => {
    //             if (predicate(handlerEvent)) {
    //                 return fn(handlerEvent);
    //             }
    //         };
    //         return handler;
    //     }, deps
    // );

    const useMemoHandler = useCallback(
        (event: KeyboardEvent) => {
            const [key, shortcut] = (Object.entries(shortcusts).find(([_key, value]) => value.is(event)) || []) as [ShortcustKey, Shortcut];
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
        }, []
    );
};

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpenCreateDialog = useSetAtom(doOpenSawOverlayForLoginAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    useEffect(() => {
        shortcusts.openOptionsDialog.action = () => doOpenOptionsDialog(true);
        shortcusts.openFilterDialog.action = () => doOpenFilterDialog(true);
        shortcusts.openCreateDialog.action = () => doOpenCreateDialog(true);
        shortcusts.saveOneIfNotNull.action = () => doSaveOneIfNotNull();
        shortcusts.saveAll.action = () => doSaveAll();
        shortcusts.toggleDebug.action = () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
    }, []);


    useKey(
        (event: KeyboardEvent) => {
            // const shortcut = shortcusts[event.key as keyof typeof shortcusts];
            // if (shortcut) {
            //     event.preventDefault();
            //     shortcut.action?.();
            // }
            return false;
        },
        (event) => {
        }
    );


    // Ctrl+,
    useKey((event) => event.ctrlKey && event.key === ',', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doOpenOptionsDialog(true);
        }
    });

    // Ctrl+F
    useKey((event) => event.ctrlKey && event.key === 'f', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doOpenFilterDialog(true);
        }
    });

    // Atl+N note: Ctrl ans Shift are taken by the browser
    useKey((event) => event.altKey && event.key === 'n', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doOpenCreateDialog(true);
        }
    });

    // Ctrl+S
    useKey((event) => event.ctrlKey && event.key === 's', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doSaveOneIfNotNull();
        }
    });

    // Alt+S
    useKey((event) => event.altKey && event.key === 's', (event) => {
        if (!isRootDirEmpty()) {
            event.preventDefault(); doSaveAll();
        }
    });

    // Ctrl+Alt+Shift+D
    useKey((event) => event.ctrlKey && event.altKey && event.key === 'D', (event) => {
        if (!isRootDirEmpty()) { //TODO: this should be dialog options open
            event.preventDefault(); debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
        }
    });

    // Ctrl+1 // temporary for debbuging quick access
    // useKey((event) => event.altKey && event.key === '2', (event) => { event.preventDefault(); doOpenCreateDialog(true); });

    return null;
}
