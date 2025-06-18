import { type JSX } from "react";
import { UISymbolDefs } from "@ui/icons";
import { AppGlobals } from "./components/4-dialogs";
import { AppContent } from "./components";

export function App(): JSX.Element {
    return (<>
        <UISymbolDefs />
        {/* <SpyAllIcons includeSvgSymbols /> */}
        <AppContent />
        <AppGlobals />
    </>);
}

//TODO: add version request from main and DpAgent
//TODO: beforeunload handler to save changed files

//TODO: use inputFocusClasses from one location
//TODO: in files list: kbd up/down should simulate hover and by enter should select; selected item should be highlighted with a different color

//TODO: from all filenames remove sourrounding curly braces (BTW: this is breaking File Explorer sorting order)
//TODO: add feature to rename files with/without domain name prefix as PMIT does

//TODO: we need global toast ID to clean previous toast. This happens when we show toast and drop files but toast is still visible. see TestOpenFieldCatalog

//TODO: save pictures previews in separate folder

//12.09.24, files
//    //TODO: combine file icons in separated by slash if forms are mixed (manual and normal)
//    //TODO: add option to show only root and A/B/C folder and ignore other sub-folders

//12.11.24, field catalog
//    //TODO: buttons are not stored in field catalog
//    //TODO: buttons should not have dbname (it is useless, they don't have state to save)

//12.14.25, create new manifest
//    //src/shell/xternal-to-renderer/7-napi-calls/4-get-window-mani.ts
//    //TODO: define ManifestForWindowCreatorResult when result is object
//    //TODO: error handling
//    //TODO: test screenshots get/update for many open chrome windows and get content for active window with many other windows opened and controls

//12.15.25, scroll position
//    //TODO: preserve scroll position - partially done
//    //TODO: prevent dialog from closing when clicking outside of the dialog

//    //TODO: when open mani chrome windows update sometimes goes forever - provide feedback to user and cancel the update button

//12.17.25, screenshot timeout
//    //ocasionally the screenshot is not taken and the timeout is reached, we need to have cancel the detection and re-entrance should be blocked on server side as well
//        //otherwise stack corruption will happen
//    //build counter is not incremented for browser windows (win32 OK)
//    //TODO: highlight application window rect; to unsure that it's the right window

//03.08.25
//    //TODO: update .5sec and show even number only
//    //TODO: handle cancel detection error message
//    //TODO: fix global param uspadte icon automatically
    
//04.23.25
//    //TODO: check before close event if any unsaved changes

//04.27.25
//    //TODO: where from atom49 is coming on first create? - done; (this is derived atom from newManiContent.newFileUsAtomAtom)
//    //TODO: bug: filter dialog is shown over create new manifest dialog
//    //TODO: UI option: add option open last folder at startup
//    //TODO: UI option: window monitor w/ electron should have 4 corner buttons for quick navigation with pressed state; keep this as an option

//04.29.25
//    //TODO: bug: confirmation dialog: default button is the first one. This is not good UX
//    //TODO: bug: check if folder exists in electron version
//    //TODO: load MRU UI with framer and remove UI shifting - done

//04.13.25
//TODO: from main - we cannot open empty folder; temp solution use drag and drop - done?
//src/renderer/src/store/1-atoms/1-files/2-do-load-files/0-all/0-all-set-atoms.ts

//04.29.25
//TODO: - done
// From line 116 catched error:
// Mru folder handle is invalid {fpath: '111', handle: FileSystemDirectoryHandle, fromMain: false}
// NotFoundError: A requested file or directory could not be found at the time an operation was processed. {code: 8, name: 'NotFoundError', message: 'A requested file or directory could not be found at the time an operation was processed.'}
//
// We need to show error message and remove from MRU list
//src/renderer/src/store/1-atoms/1-files/2-do-load-files/0-all/0-all-set-atoms.ts

//04.30.25
//TODO: if folder is missing then we need to show error message and remove from MRU list: with and without hasMain() - done
//src/renderer/src/store/1-atoms/1-files/2-do-load-files/0-all/0-all-set-atoms.ts

//05.01.25
//TODO: check if folder/folder exists in all cases when we:
//      delete (we don't have delete folder, delete file if folder not exist: we show good message and after restore folder we delete file wo/ any problems),
//      save (if folder not exist then create folder then it will be created and saved),
//      open file (especially wo/ electron)
//TODO: make check for file exists as a separate atom

//05.07.25 //src/renderer/src/store/1-atoms/7-dialogs/2-create-dialog-atoms/3-do-move-to-second-dlg.tsx
//TODO: manifest name before save should be updated with dialog
//TODO: highlight fields should be turned off but when?
//TODO: reset for new login should remove it from the tree - done
//TODO: reset button should be discard instead of reset - done
//TODO: create cpass should be switch tab to cpass - done
//TODO: delete cpass should be switch tab to login or options - done
//TODO: close folder did not clear all file changes - done

//05.11.25
//TODO: input instead of h-7 should be h-6 and py-3 replace to py-1
//TODO: double click on tree item should show dialog to rename
//TODO: right click on tree item should context menu with rename and delete
//TODO: show tree item checkboxe for test mode

//05.12.25
//TODO: show wait animation (sometimes there is a big delay before file is saved) //src/renderer/src/components/2-main/2-right/1-header/0-all/5-save-reset-buttons.tsx
//TODO: show confetti animation after create new manifest (and add option to disable it) //src/renderer/src/components/4-dialogs/2-dlg-create-login/1-dlg-w-saw/2-entry-create-dlg/0-all-dlg.tsx
//TODO: make useAccordionState({ formIdx, name }: { formIdx: number; name: string; }) generic with formIdx just name //src/renderer/src/ui/motion-primitives/2-accordion-with-trigger.tsx

//05.12.25
//TODO: get tree item under cursor and show context menu

//05.14.25
//TODO: const renameFileUsAtom = useSetAtom(doVerifyManiNameAtom); 
// // Add custom dialog title for rename 
// // update dialog overlay blur 
// // smaller size
// // add more fields to rename dialog
//TODO: block global context menu and add option to allow it - done
//TODO: block global context menu for input fields in a specific way, i.e. remove 'inspect element' option
//  //https://github.com/sindresorhus/electron-context-menu/blob/main/index.js#L219

//05.18.25
//PROBLEM: no scroll bar in tree view when loading a lot of files - done, it's appeares only on hover
//PROBLEM: dialog buttons on small screens are looking weird - done, it's CSS break points
//PROBLEM: build production fails to load with error: Children on undefined...: react_production_min.Children = { map: S, forEach: function(a2, b2, e2) { - done at least temporary
//PROBLEM: Uncaught Error: no.in.data when open rename dialog first time

//05.24.25
//TODO: password change: add column ref from login form; if ref is set then list options are 'Ask-Reuse' and 'Write-Only'
//TODO: password change: remove column Policy
//TODO: password change: don't show text fields and add button show/hide text fields; maybe text field should go to 'Screen Detection' block

//06.08.25
//TODO: call to main to set saw monitor window position - done
//TODO: get window extra info atom - done

//06.18.25				
// TODO: support for single page logins: add checkbox: 'This is single page login and next page has password'.
