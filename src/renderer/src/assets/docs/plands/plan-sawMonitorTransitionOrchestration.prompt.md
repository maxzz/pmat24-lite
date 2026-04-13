## Plan: Saw Monitor Transition Orchestration

Implement a dedicated transition controller for the Saw monitor instead of tying the workflow to a single open/closed boolean. Keep the full-window overlay/root mounted separately from SawBody visibility, wait for the next paint before each resize/visibility swap, and add a main-to-renderer resize-applied acknowledgment so the open/close sequences are deterministic. Cancel is confirmed as Small -> Large.

**Steps**
1. Phase 1 - Transition state model: introduce an explicit Saw monitor stage in the renderer store, such as closed/opening/open/closing, and derive root-mounted vs. body-visible state from it. Keep the existing public entry atoms for opening the flow so callers do not change, but stop using the current boolean open atom as the only source of truth. This phase blocks the rest.
2. Phase 2 - Resize handshake: add a new main-to-renderer event that acknowledges the Saw mode resize command has been applied. Use the existing event channel and listener atom rather than inventing a new transport. The renderer transition controller should be able to await this acknowledgment instead of relying on arbitrary delays. This phase blocks steps 3 through 5.
3. Phase 3 - Opening sequence: refactor the open path so it becomes overlay/root visible with SawBody hidden, wait for the next paint, request the small Saw window size, await the resize acknowledgment, then start monitoring and reveal SawBody. Move the visual intro animation from the full-screen wrapper to a nested SawBody motion container so only the content scales from 0.9 to 1 while the overlay/root remains stable. Depends on steps 1 and 2.
4. Phase 4 - Closing sequence: create one shared async close path used by Cancel and successful Continue. The sequence should be: hide SawBody, stop monitor updates, allow highlight cleanup, wait for the next paint, request normal window size, await the resize acknowledgment, then unmount the overlay/root and clear transient UI state. Depends on steps 1 through 3.
5. Phase 5 - Continue success vs. failure behavior: keep the existing manifest creation attempt before any close transition. If creation fails, restart monitoring and leave SawBody exactly as-is. If creation succeeds, run the shared close transition and only after it completes continue into the new-manifest editor path (inline or dialog). Depends on step 4.
6. Phase 6 - Cleanup and safety checks: remove the obsolete commented delay/show-hide workarounds, and make sure the main-process saw-mode-canceled path still routes through a safe close/reset sequence so the UI cannot get stuck mid-transition. This can be done after step 4 while finalizing the flow.

**Relevant files**
- `c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/components/4-dialogs/2-dlg-create-login/1-entry-saw-monitor/0-all-saw-dlg.tsx` — split overlay/root visibility from SawBody visibility and move the content animation here.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/1-open-saw-monitor.ts` — replace immediate open/resize behavior with staged orchestration.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/3-do-move-to-second-dlg.tsx` — route Cancel and successful Continue through a shared async close transition; keep failure as a no-op for SawBody.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/4-dialogs-atoms/2-create-dialog-atoms/0-ctx/8-saw-monitor-size.tsx` — keep resize command entry points but adapt them to the transition controller and main-cancel behavior.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/xternal-to-main/2-gates-in-client-as-atoms/2-gate-react-listener-atom.ts` — receive the resize-applied acknowledgment and feed any transition waiter state.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/shared/ipc-types/3-main-to-render-call-types.ts` — add the new acknowledgment event type.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/shell/xternal-to-renderer/2-commands-in-main/0-all/1-set-saw-mode-on-main.ts` — send the acknowledgment after the resize command is applied.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/shell/xternal-to-renderer/1-gates-in-main/1-dispatch-in-main-from-renderer-calls.ts` — keep the main-side dispatch aligned if the reply is emitted there.
- `c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/7-napi-atoms/6-do-highlight-window/0-use-saw-rect-monitor.tsx` — reference highlight cleanup behavior when SawBody is hidden/unmounted during exit.

**Verification**
1. Manual open flow: start from the large main window, open Create New Manifest, confirm the overlay/root appears first, the window shrinks, then SawBody appears with a 0.9 to 1 scale animation.
2. Manual cancel flow: with SawBody visible, trigger Cancel from both the close button and Escape, confirm SawBody hides first, the overlay/root stays visible, the window restores Small -> Large, and only then the overlay/root disappears.
3. Manual Continue success flow: create a valid manifest and confirm nothing closes until creation succeeds; after success, confirm the close transition completes before the inline editor or new-manifest dialog appears.
4. Manual Continue failure flow: force manifest creation to fail and confirm SawBody stays visible, monitoring resumes, and no resize/overlay exit sequence runs.
5. Manual main-window close while Saw mode is active: confirm the existing saw-mode-canceled behavior still resets the UI cleanly and does not leave overlay/body state stuck.
6. Automated coverage: only add a Vitest test if a pure transition helper or reducer is extracted; otherwise rely on manual Electron verification because this workflow has no existing automated coverage.

**Decisions**
- Confirmed with the user: Cancel should restore the normal large window, not resize Large -> Small.
- Included scope: opening transition, Cancel exit, successful Continue exit, and preserving current no-op behavior on manifest creation failure.
- Excluded scope: changing manifest parsing/validation rules, changing editor behavior other than delaying it until after the close transition, or redesigning unrelated dialogs.

**Further Considerations**
1. Recommended implementation shape: use a small explicit stage machine rather than loosely coupled booleans, because the workflow now has real async boundaries and success/failure branching.
2. Recommended synchronization strategy: combine a renderer-side next-paint wait with a main-to-renderer resize-applied acknowledgment; a fixed timeout alone is weaker and more brittle.
