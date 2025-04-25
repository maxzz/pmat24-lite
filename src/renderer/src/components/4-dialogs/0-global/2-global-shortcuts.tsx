import { useEffect, useMemo } from "react";
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

type Shortcut = { text: string; is: (event: KeyboardEvent) => boolean; action?: () => void; };

const shortcustKeys: Record<string, Shortcut> = {
    openOptionsDialog: {
        text: 'Ctrl+,',
        is: (event) => event.ctrlKey && event.key === ',',
        action: () => doOpenOptionsDialog(true),
    },
    openFilterDialog: {
        text: 'Ctrl+F',
        is: (event) => event.ctrlKey && event.key === 'f',
        action: () => doOpenFilterDialog(true),
    },
    openCreateDialog: {
        text: 'Alt+N',
        is: (event) => event.altKey && event.key === 'n',
        action: () => doOpenCreateDialog(true),
    },
    saveOneIfNotNull: {
        text: 'Ctrl+S',
        is: (event) => event.ctrlKey && event.key === 's',
        action: () => doSaveOneIfNotNull(),
    },
    saveAll: {
        text: 'Alt+S',
        is: (event) => event.altKey && event.key === 's',
        action: () => doSaveAll(),
    },
    toggleDebug: {
        text: 'Ctrl+Alt+Shift+D',
        is: (event) => event.ctrlKey && event.altKey && event.key === 'D',
        action: () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess,
    },
};

export function AppGlobalShortcuts() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const doOpenFilterDialog = useSetAtom(filterDialogOpenAtom);
    const doOpenCreateDialog = useSetAtom(doOpenSawOverlayForLoginAtom);
    const doSaveOneIfNotNull = useSetAtom(doSaveRightPanelFileAtom);
    const doSaveAll = useSetAtom(doSaveAllAtom);

    useEffect(() => {
        shortcustKeys.openOptionsDialog.action = () => doOpenOptionsDialog(true);
        shortcustKeys.openFilterDialog.action = () => doOpenFilterDialog(true);
        shortcustKeys.openCreateDialog.action = () => doOpenCreateDialog(true);
        shortcustKeys.saveOneIfNotNull.action = () => doSaveOneIfNotNull();
        shortcustKeys.saveAll.action = () => doSaveAll();
        shortcustKeys.toggleDebug.action = () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess;
    }, []);

//     const shortcustKeys: Record<string, Shortcut> = useMemo(() => {
//         return const shortcustKeys: Record<string, Shortcut> = {
//             openOptionsDialog: {
//                 text: 'Ctrl+,',
//                 is: (event) => event.ctrlKey && event.key === ',',
//                 action: () => doOpenOptionsDialog(true),
//             },
//             openFilterDialog: {
//                 text: 'Ctrl+F',
//                 is: (event) => event.ctrlKey && event.key === 'f',
//                 action: () => doOpenFilterDialog(true),
//             },
//             openCreateDialog: {
//                 text: 'Alt+N',
//                 is: (event) => event.altKey && event.key === 'n',
//                 action: () => doOpenCreateDialog(true),
//             },
//             saveOneIfNotNull: {
//                 text: 'Ctrl+S',
//                 is: (event) => event.ctrlKey && event.key === 's',
//                 action: () => doSaveOneIfNotNull(),
//             },
//             saveAll: {
//                 text: 'Alt+S',
//                 is: (event) => event.altKey && event.key === 's',
//                 action: () => doSaveAll(),
//             },
//             toggleDebug: {
//                 text: 'Ctrl+Alt+Shift+D',
//                 is: (event) => event.ctrlKey && event.altKey && event.key === 'D',
//                 action: () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess,
//             },
//         };



//         return {
//             {
//             text: 'Ctrl+,',
//                 is: (event) => event.ctrlKey && event.key === ',',
//                     action: () => doOpenOptionsDialog(true),
//             },
//         {
//             text: 'Ctrl+F',
//                 is: (event) => event.ctrlKey && event.key === 'f',
//                     action: () => doOpenFilterDialog(true),
//             },
//         {
//             text: 'Alt+N',
//                 is: (event) => event.altKey && event.key === 'n',
//                     action: () => doOpenCreateDialog(true),
//             },
//         {
//             text: 'Ctrl+S',
//                 is: (event) => event.ctrlKey && event.key === 's',
//                     action: () => doSaveOneIfNotNull(),
//             },
//         {
//             text: 'Alt+S',
//                 is: (event) => event.altKey && event.key === 's',
//                     action: () => doSaveAll(),
//             },
//         {
//             text: 'Ctrl+Alt+Shift+D',
//                 is: (event) => event.ctrlKey && event.altKey && event.key === 'D',
//                     action: () => debugSettings.debugOnly.debugAccess = !debugSettings.debugOnly.debugAccess,
//             },
//     };
// }, []);

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
