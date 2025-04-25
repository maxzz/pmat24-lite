import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { useKey } from "react-use";
import { isRootDirEmpty } from "@/store";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { doSaveRightPanelFileAtom, doSaveAllAtom } from "@/store/1-atoms/2-file-mani-atoms";
import { doOpenOptionsDialogAtom, doOpenSawOverlayForLoginAtom, filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { hasMain } from "@/xternal-to-main";

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpenCreateDialog = useSetAtom(doOpenSawOverlayForLoginAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    useEffect(() => {
        appShortcuts.openOptionsDialog.action = () => doOpenOptionsDialog(true);
        appShortcuts.openFilterDialog.action = () => doOpenFilterDialog(true);
        appShortcuts.openCreateDialog.action = () => doOpenCreateDialog(true);
        appShortcuts.saveOneIfNotNull.action = () => doSaveOneIfNotNull();
        appShortcuts.saveAll.action = () => doSaveAll();
        appShortcuts.toggleDebug.action = () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
    }, []);

    useKeyNew();

    return null;
}

export const shortcutNameSettings /**/ = hasMain() ? "Ctrl+," : "";                         // Open settings dialog
export const shortcutNameFilter   /**/ = hasMain() ? "Ctrl+F" : "Ctrl+Shift+F";             // Filter manifest list
export const shortcutNameCreate   /**/ = hasMain() ? "Ctrl+N" : "";                         // Create new manifest
export const shortcutNameSave     /**/ = hasMain() ? "Ctrl+S" : "Ctrl+Alt+S";               // Save current manifest. Ctrl+S is already taken by browser
export const shortcutNameSaveAll  /**/ = hasMain() ? "Ctrl+Shift+S" : "";                   // Save all manifests; Ctrl+Shift+S is already taken by Edge browser

type ShortcustKey = 'openOptionsDialog' | 'openFilterDialog' | 'openCreateDialog' | 'saveOneIfNotNull' | 'saveAll' | 'toggleDebug';
type Shortcut = { text: string; is: (event: KeyboardEvent) => boolean; action?: (event: KeyboardEvent, shortcut: ShortcustKey) => void; };

const appShortcuts: Record<ShortcustKey, Shortcut> = {
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
            
            // if (event.key === 'Control' || event.key === 'Alt' || event.key === 'Shift') {
            //     return;
            // }

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

//TODO: replace all shortcutNameSettings... with shortcuts
//TODO: check hasMain() and remove all shortcuts or dissable them
//TODO: from empty folder create manifest, delete manifest, create manifest, save -> crash in ManiEditorFormSelector
