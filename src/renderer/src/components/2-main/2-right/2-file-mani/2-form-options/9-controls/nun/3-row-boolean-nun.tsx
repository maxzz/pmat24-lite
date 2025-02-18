import { type InputHTMLAttributes } from "react";
import { type PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "@/utils";

type RowBooleanProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
};

export function RowBoolean({ useItAtom, className, ...rest }: RowBooleanProps) {
    const [useIt, setUseIt] = useAtom(useItAtom);

    return (
        <input
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
    );
}
