import { useAtomValue, useSetAtom } from "jotai";
import { ChildrenWithLabel2Cols } from "@/ui/local-ui";
import { Switch } from "@/ui/shadcn";
import { modeTextInTest } from "./8-test-in-use-names";
import { type OFormProps, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { doSetManiInTestAtom } from "@/store/0-serve-atoms/5-do-inuse-test";

export function PanelTestInUse({ oFormProps }: { oFormProps: OFormProps; }) {
    return (<>
        {/* <Input_InUseMode fileUsCtx={oFormProps.oAllAtoms.fileUsCtx} /> */}
        <Input_InTestMode fileUsCtx={oFormProps.oAllAtoms.fileUsCtx} />
    </>);
}

function Input_InTestMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const isInTestMode = useAtomValue(fileUsCtx.fileUs.maniInTestAtom);
    const doSetManiInTest = useSetAtom(doSetManiInTestAtom);
    
    return (<>
        <ChildrenWithLabel2Cols label={modeTextInTest}>
            <Switch className={toggleClasses} checked={isInTestMode} onCheckedChange={(checked) => doSetManiInTest({ fileUsCtx, inTest: checked })}></Switch>
        </ChildrenWithLabel2Cols>
    </>);
}

// function Input_InUseMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
//     const notInUse = !useAtomValue(fileUsCtx.fileUs.maniInUseAtom);
//     const doSetManiInUse = useSetAtom(doSetManiInUseAtom);

//     return (<>
//         <ChildrenWithLabel2Cols label={modeTextInUse}>
//             <Switch className={toggleClasses} checked={notInUse} onCheckedChange={(checked) => doSetManiInUse({ fileUsCtx, inUse: !checked })}></Switch>
//         </ChildrenWithLabel2Cols>
//     </>);
// }

const toggleClasses = "data-[state=checked]:bg-primary/20 dark:data-[state=checked]:bg-primary/40";
