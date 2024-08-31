import { HTMLAttributes, ReactNode } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type RowInputState } from "@/ui";
import { modifierKeys } from "@/store/manifest";
import { InputSelectUi } from "../../8-ui";
import { classNames } from "@/utils";

type FrameProps = HTMLAttributes<HTMLDivElement> & {
    label: string;
    children: ReactNode;
};

export function Frame({ label, children, className, ...rest }: FrameProps) {
    return (
        <div className={classNames("relative p-2 border-primary-400 dark:border-primary-700 border rounded", className)} {...rest}>
            <div className="absolute left-1 -top-2.5 px-1 bg-primary-100 dark:bg-primary-800">
                {label}
            </div>

            {children}
        </div>
    );
}

function Modifier({ label, itemAtom }: { label: string; itemAtom: PrimitiveAtom<RowInputState>; }) {
    const [modifier, setModifier] = useAtom(itemAtom);
    return (
        <div className={classNames("flex-1 max-w-36 flex @[190px]:flex-col @[190px]:gap-y-0.5 items-center gap-x-2")}>
            <div className="self-start @[190px]:pl-2 min-w-12 text-xs @[190px]:text-[0.65rem] font-light">
                {label}
            </div>

            <InputSelectUi
                items={modifierKeys}
                value={modifier.data}
                onValueChange={(value) => setModifier((prev) => ({ ...prev, data: value }))}
            />
        </div>
    );
}

export function InputModifiers({ item }: { item: ManualFieldState.KbdForAtoms; }) {
    return (
        <Frame className="@container -ml-2" label="Key modifiers">
            <div className="my-2 flex flex-col @[190px]:flex-row gap-1">

                <Modifier label="Shift" itemAtom={item.shiftAtom} />
                <Modifier label="Control" itemAtom={item.ctrlAtom} />
                <Modifier label="Alt" itemAtom={item.altAtom} />

            </div>
        </Frame>
    );
}
