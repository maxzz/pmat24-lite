import { HTMLAttributes, ReactNode } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { modifierKeys } from "@/store/manifest";
import { InputSelectUi, type RowInputStateAtom } from "@/ui";
import { type ManualFieldState } from "@/store/2-file-mani-atoms";

export function InputModifiers({ item }: { item: ManualFieldState.CtxKbd; }) {
    return (
        <div className="@container/modifier max-w-[220px]">
            <div className="1my-1.5 flex flex-col justify-between @[190px]/modifier:flex-row gap-1">

                <Modifier label="Shift" valueAtom={item.shiftAtom} />
                <Modifier label="Control" valueAtom={item.ctrlAtom} />
                <Modifier label="Alt" valueAtom={item.altAtom} />

            </div>
        </div>
    );
}

function Modifier({ label, valueAtom }: { label: string; valueAtom: RowInputStateAtom; }) {
    const [modifier, setModifier] = useAtom(valueAtom);
    return (
        <div className={classNames("flex-1 max-w-36 flex items-center @[190px]/modifier:flex-col @[190px]/modifier:gap-y-px gap-x-2")}>
            <div className="self-start @[190px]/modifier:pl-2 min-w-12 text-xs @[190px]/modifier:text-[0.65rem] font-light">
                {label}
            </div>

            <div className="self-start">
                <InputSelectUi
                    items={modifierKeys}
                    value={modifier.data}
                    onValueChange={(value) => setModifier((prev) => ({ ...prev, data: value }))}
                />
            </div>
        </div>
    );
}
