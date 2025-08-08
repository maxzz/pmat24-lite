import { useAtom } from "jotai";
import { ChildrenWithLabel2Cols } from "@/ui/local-ui";
import { Switch } from "@/ui/shadcn";
import { modeTextInTest, modeTextInUse } from "./8-test-in-use-names";
import { type OFormProps, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";

export function TestInUseState({ oFormProps }: { oFormProps: OFormProps; }) {
    return (<>
        <Input_InUseMode fileUsCtx={oFormProps.oAllAtoms.fileUsCtx} />
        <Input_InTestMode fileUsCtx={oFormProps.oAllAtoms.fileUsCtx} />
    </>);
}

function Input_InUseMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const [isInUseMode, setInUseMode] = useAtom(fileUsCtx.fileUs.maniInUseAtom);

    return (<>
        <ChildrenWithLabel2Cols label={modeTextInUse}>
            <Switch className={toggleClasses} checked={isInUseMode} onCheckedChange={(checked) => setInUseMode(checked)}></Switch>
        </ChildrenWithLabel2Cols>
    </>);
}

function Input_InTestMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const [isInTestMode, setInTestMode] = useAtom(fileUsCtx.fileUs.maniInTestAtom);

    return (<>
        <ChildrenWithLabel2Cols label={modeTextInTest}>
            <Switch className={toggleClasses} checked={isInTestMode} onCheckedChange={(checked) => setInTestMode(checked)}></Switch>
        </ChildrenWithLabel2Cols>
    </>);
}

const toggleClasses = "data-[state=checked]:bg-primary/20 dark:data-[state=checked]:bg-primary/40";
