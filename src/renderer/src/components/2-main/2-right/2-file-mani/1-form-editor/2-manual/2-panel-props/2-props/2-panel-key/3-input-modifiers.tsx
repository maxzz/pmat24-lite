import { HTMLAttributes, ReactNode } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { modifierKeys } from "@/store/8-manifest";
import { SelectTm, type RowInputStateAtom } from "@/ui/local-ui";
import { type ManualFieldState } from "@/store/2-file-mani-atoms";

export function InputModifiers({ item }: { item: ManualFieldState.CtxKbd; }) {
    return (
        <div className="inline-flex max-w-min justify-items-start gap-2">
            <Modifier label="Shift" valueAtom={item.shiftAtom} />
            <Modifier label="Control" valueAtom={item.ctrlAtom} />
            <Modifier label="Alt" valueAtom={item.altAtom} />
        </div>
    );
}

function Modifier({ label, valueAtom }: { label: string; valueAtom: RowInputStateAtom; }) {
    const [modifier, setModifier] = useAtom(valueAtom);
    return (
        <div className={classNames("flex-1 max-w-36 flex flex-col items-center gap-y-px gap-x-2")}>
            <div className="self-start text-xs">
                {label}
            </div>

            <SelectTm
                items={modifierKeys}
                value={modifier.data}
                onValueChange={(value) => setModifier((prev) => ({ ...prev, data: value }))}
            />
        </div>
    );
}
