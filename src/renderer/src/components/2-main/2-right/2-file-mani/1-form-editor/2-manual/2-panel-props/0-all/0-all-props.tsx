import { useAtomValue } from "jotai";
import { doSelectIdxAtom, type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { classNames } from "@/utils";
import { PanelPropsTitle } from "./1-panel-props-title";
import { editorFrameClasses } from "../../8-shared-styles";
import { ChunkKey } from "@/store/manifest";

// export function ManualPanelProps({ maniAtoms, formAtoms, formIdx }: MFormContextProps) {
//     const items = useAtomValue(formAtoms.manual.chunksAtom);
//     return (<>
//         <div className="">
//             {items.map(
//                 (item, idx) => (
//                     <div key={idx}>
//                         {item.type}
//                     </div>
//                 ))
//             }
//         </div>
//     </>);
// }


// import { gScriptState, selectedIdxAtom } from "@/store";
// import { getPropsEditor } from "../props";
// import { PanelPropsTitle } from "./1-panel-props-title";


function ItemPropsEditor({ maniAtoms, formAtoms, formIdx }: MFormContextProps) {
    const ctx = formAtoms.manual;
    const doSelectAtom = useAtomValue(doSelectIdxAtom);
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectedRef = useAtomValue(ctx.selectedIdxStoreAtom);
    const selectedItem = chunks[selectedRef];
    if (!selectedItem) {
        return <PanelPropsTitle />;
    }

    // const { scriptItems: scriptItemsSnap } = useSnapshot(gScriptState);
    // const selectedRef = useAtomValue(selectedIdxAtom);

    // const scriptItemSnap = scriptItemsSnap[selectedRef];
    // if (!scriptItemSnap) {
    //     return <PanelPropsTitle />;
    // }

    // const scriptItem = gScriptState.scriptItems[selectedRef];
    // const propsEditor = getPropsEditor({ scriptItem, scriptItemSnap });

    return (<>
        <PanelPropsTitle type={selectedItem.type} />
        {/* <PanelPropsTitle type={scriptItemSnap.type} /> */}
        {/* {propsEditor} */}
    </>);
}

const PanelPropsClasses = "\
min-h-80 text-xs \
grid grid-rows-[auto,1fr] gap-2 \
overflow-hidden \
select-none";

export function ManualPanelProps({ maniAtoms, formAtoms, formIdx }: MFormContextProps) {
    return (
        <div className={classNames(PanelPropsClasses, editorFrameClasses/*, focusWithinClasses*/)}>
            <ItemPropsEditor maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </div>
    );
}
