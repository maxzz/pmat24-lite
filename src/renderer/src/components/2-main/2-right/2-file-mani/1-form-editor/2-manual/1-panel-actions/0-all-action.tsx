// import { useEffect } from "react";
// import { useInitSelectedIdx } from "@/store";
// import { PanelActionsTitle } from "./1-panel-title";
// import { PanelActionsList } from "./2-panel-items";
// import { classNames } from "@/utils";
// import { editorFrameClasses } from "@/components/ui/shared-styles";

// export function PanelActions() {
//     const cb = useInitSelectedIdx();
//     useEffect(() => { cb(); }, []);
//     return (
//         <div className={classNames("h-full min-h-[20rem] flex flex-col space-y-1 select-none", editorFrameClasses/*, focusWithinClasses*/)}>
//             <PanelActionsTitle />
//             <PanelActionsList />
//         </div>
//     );
// };
