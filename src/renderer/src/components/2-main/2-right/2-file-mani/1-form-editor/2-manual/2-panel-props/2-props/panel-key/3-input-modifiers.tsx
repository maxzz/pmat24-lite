import { HTMLAttributes, ReactNode } from "react";
import { useSnapshot } from "valtio";
import { SrcriptItemKey, SrcriptItemModifiers } from "@/store";
import { modifierKeys } from "@/store/manifest";
import { classNames } from "@/utils";
import { InputSelectUi } from "../../ui";

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

function Modifier({ label, name, item }: { label: string; name: SrcriptItemModifiers; item: SrcriptItemKey; }) {
    const snap = useSnapshot(item);
    return (
        <div className={classNames("flex-1 max-w-36 flex @[190px]:flex-col @[190px]:gap-y-0.5 items-center gap-x-2")}>
            <div className="self-start @[190px]:pl-2 min-w-12 text-xs @[190px]:text-[0.65rem] font-light">
                {label}
            </div>

            <InputSelectUi
                items={modifierKeys}
                value={`${snap[name]}`}
                onValueChange={(value) => item[name] = +value}
            />
        </div>
    );
}

export function InputModifiers({ item }: { item: SrcriptItemKey; }) {
    return (
        <Frame className="@container -ml-2" label="Key modifiers">
            <div className="my-2 flex flex-col @[190px]:flex-row gap-1">

                <Modifier label="Shift" name="shift" item={item} />
                <Modifier label="Control" name="ctrl" item={item} />
                <Modifier label="Alt" name="alt" item={item} />

            </div>
        </Frame>
    );
}
