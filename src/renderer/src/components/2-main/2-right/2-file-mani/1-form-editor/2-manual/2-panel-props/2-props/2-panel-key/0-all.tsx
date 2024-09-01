import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputKey } from "./1-input-key";
import { InputRepeat } from "./2-input-repeat";
import { InputModifiers } from "./3-input-modifiers";

export function PropsEditorKey({ item }: { item: ManualFieldState.KbdForAtoms; }) {
    return (<>
        <InputKey item={item} />
        <InputRepeat item={item} />
        <InputModifiers item={item} />
    </>);
}