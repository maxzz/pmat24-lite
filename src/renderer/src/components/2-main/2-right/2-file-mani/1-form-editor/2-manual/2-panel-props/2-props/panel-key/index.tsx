import { HTMLAttributes } from "react";
import { SrcriptItemKey } from "@/store";
import { propsBoxClasses } from "../../ui";
import { InputKey } from "./1-input-key";
import { InputRepeat } from "./2-input-repeat";
import { InputModifiers } from "./3-input-modifiers";

export function PropsEditorKey({ item, ...rest }: { item: SrcriptItemKey; } & HTMLAttributes<HTMLElement>) {
    return (
        <div className={propsBoxClasses} {...rest}>
            <InputKey item={item} />
            <InputRepeat item={item} />
            <InputModifiers item={item} />
        </div>
    );
}
