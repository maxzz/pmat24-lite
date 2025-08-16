import { type ManualFieldState } from "@/store/2-file-mani-atoms";
import { InputKey } from "./1-input-key";
import { InputRepeat } from "./2-input-repeat";
import { InputModifiers } from "./3-input-modifiers";

export function PropsEditorKey({ item }: { item: ManualFieldState.CtxKbd; }) {
    return (<>
        <div className="flex items-center gap-x-3">
            <InputKey valueAtom={item.charAtom} triggerClasses="min-w-36" />
            <InputRepeat valueAtom={item.repeatAtom} />
        </div>
        
        <InputModifiers item={item} />
    </>);
}
