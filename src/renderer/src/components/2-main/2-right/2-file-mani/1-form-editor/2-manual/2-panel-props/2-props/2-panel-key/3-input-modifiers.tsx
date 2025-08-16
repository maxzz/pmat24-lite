import { HTMLAttributes, ReactNode } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { modifierKeys } from "@/store/manifest";
import { InputSelectUi, type RowInputStateAtom } from "@/ui";
import { type ManualFieldState } from "@/store/1-file-mani-atoms";

type FrameProps = HTMLAttributes<HTMLDivElement> & {
    label: string;
    children: ReactNode;
};

export function GroupFrame({ label, children, className, ...rest }: FrameProps) {
    return (
        <div className={classNames("relative pl-1 pt-2 border-border border-dotted border rounded", className)} {...rest}>
            <div className="absolute -left-1 -top-3 px-1 py-1 bg-muted/20 border-border border-dotted border rounded">
                {label}
            </div>

            {children}
        </div>
    );
}

export function InputModifiers({ item }: { item: ManualFieldState.CtxKbd; }) {
    return (
        <GroupFrame className="@container/modifier mt-2 max-w-[220px]" label="Key modifiers:">
            <div className="my-1.5 flex flex-col justify-between @[190px]/modifier:flex-row gap-1">

                <Modifier label="Shift" valueAtom={item.shiftAtom} />
                <Modifier label="Control" valueAtom={item.ctrlAtom} />
                <Modifier label="Alt" valueAtom={item.altAtom} />

            </div>
        </GroupFrame>
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
