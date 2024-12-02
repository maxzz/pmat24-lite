import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputKey } from "./1-input-key";
import { InputRepeat } from "./2-input-repeat";
import { InputModifiers } from "./3-input-modifiers";

export function PropsEditorKey({ item }: { item: ManualFieldState.CtxKbd; }) {
    return (<>
        <div className="flex items-center gap-x-4">
            <InputKey valueAtom={item.charAtom} />
            <InputRepeat valueAtom={item.repeatAtom} />
        </div>
        
        <InputModifiers item={item} />
    </>);
}
