---
name: saw-monitor-resize-animation
overview: Add a Motion-driven transition phase for the Saw Monitor overlay so window resize IPC runs after fade/scale animations, masking redraw flicker on open/close.
todos:
  - id: add-saw-transition-state
    content: Add open/close transition state + finish atoms
    status: completed
  - id: wire-dialog-animations
    content: Add exit/enter callbacks in DialogSawMonitor
    status: completed
  - id: defer-window-restore
    content: Defer setSizeNormal until exit completes
    status: completed
isProject: false
---

# Smooth saw monitor resize with Motion

## Context and touchpoints
- The saw monitor overlay already uses `AnimatePresence` + `motion.div`, but has no exit animation to mask resize changes. See [`0-all-saw-dlg.tsx`](c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/components/4-dialogs/2-dlg-create-login/1-entry-saw-monitor/0-all-saw-dlg.tsx):

```
14:25:c:\y\w\2-web\0-dp\pmat24-lite\src\renderer\src\components\4-dialogs\2-dlg-create-login\1-entry-saw-monitor\0-all-saw-dlg.tsx
export function DialogSawMonitor() {
    const isOpen = useAtomValue(isOpen_SawMonitorAtom);
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div initial={false} className="fixed inset-0 1bg-background bg-sky-300 z-100" {...animationProps}>
                    {/* {isOpen && ( */}
                        <SawBody />
                    {/* )} */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
```

- The window resize is triggered immediately on open via `setSizeSmall_SawMonitorAtom` in [`1-open-saw-monitor.ts`](c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/1-open-saw-monitor.ts):

```
36:41:c:\y\w\2-web\0-dp\pmat24-lite\src\renderer\src\store\4-dialogs-atoms\2-create-dialog-atoms\1-open-saw-monitor.ts
function onOpenChange(doOpen: boolean, set: Setter) {
    if (doOpen) {
        set(checkboxCreateManualModeAtom, false);
        set(startMonitorTimerAtom);
        set(setSizeSmall_SawMonitorAtom);
    } else {
```

- Closing paths restore size immediately in [`3-do-move-to-second-dlg.tsx`](c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/3-do-move-to-second-dlg.tsx):

```
20:26:c:\y\w\2-web\0-dp\pmat24-lite\src\renderer\src\store\4-dialogs-atoms\2-create-dialog-atoms\3-do-move-to-second-dlg.tsx
export const doCancelMoveToSecondDlgAtom = atom(
    null,
    (get, set) => {
        R2MCalls.showHideWindow(false); //TODO: do we need to hide and show? we don't use it below.
        set(close_SawMonitorAtom);
        set(setSizeNormal_SawMonitorAtom);
```

```
60:66:c:\y\w\2-web\0-dp\pmat24-lite\src\renderer\src\store\4-dialogs-atoms\2-create-dialog-atoms\3-do-move-to-second-dlg.tsx
        // 1.2. Close Saw monitor dialog

        //R2MCalls.showHideWindow(false);
        set(close_SawMonitorAtom);
        //await delay(100);
        set(setSizeNormal_SawMonitorAtom);
```

## Plan
- Add a small transition state in the saw-monitor store layer so open/close becomes a two-phase flow: "start overlay animation" → "resize window". Keep this with the existing open/close atoms in [`1-open-saw-monitor.ts`](c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/1-open-saw-monitor.ts) or a new colocated file.
- Update `DialogSawMonitor` in [`0-all-saw-dlg.tsx`](c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/components/4-dialogs/2-dlg-create-login/1-entry-saw-monitor/0-all-saw-dlg.tsx) to:
  - Add an `exit` animation to `animationProps` (fade/scale) so the overlay can cover the resize on close.
  - Hook `onAnimationComplete` for the enter animation to trigger the new "finish open" atom that runs `setSizeSmall_SawMonitorAtom` after the overlay is fully visible.
  - Hook `onExitComplete` (or a dedicated `motion` callback) to trigger the "finish close" atom that runs `setSizeNormal_SawMonitorAtom` after the overlay fades out.
- Adjust close/continue paths in [`3-do-move-to-second-dlg.tsx`](c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/3-do-move-to-second-dlg.tsx) to request the close transition (set `isOpen` false and start the exit animation) and let the exit-complete handler restore the window size, rather than calling `setSizeNormal_SawMonitorAtom` immediately.
- Add a reduced-motion guard (e.g., `useReducedMotion`) so users who prefer reduced motion keep a near-instant transition, while still sequencing resize after the overlay is visible.
- Smoke-test: open the saw monitor, close via ESC and Continue, and confirm the resize happens while the overlay is covering the UI (no content flicker).
