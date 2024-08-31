import { HTMLAttributes } from "react";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputKey } from "./1-input-key";
import { InputRepeat } from "./2-input-repeat";
import { InputModifiers } from "./3-input-modifiers";
import { propsBoxClasses } from "../../8-ui";

export function PropsEditorKey({ item, ...rest }: { item: ManualFieldState.KbdForAtoms; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={propsBoxClasses} {...rest}>
            <InputKey item={item} />
            <InputRepeat item={item} />
            <InputModifiers item={item} />
        </div>
    );
}
