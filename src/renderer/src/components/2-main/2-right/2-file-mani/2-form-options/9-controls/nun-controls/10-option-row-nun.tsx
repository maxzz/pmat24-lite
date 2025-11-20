import { type InputHTMLAttributes } from "react";
import { type PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "@/utils";
import { inputRingClasses } from "@/ui/local-ui";

export type AccessAtom = PrimitiveAtom<string | number>;

export type OptionRowInputProps<T> = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    accessAtom: T;
};

export function OptionRowInput<T extends PrimitiveAtom<string | number>>({ label, accessAtom, className, ...rest }: OptionRowInputProps<T>) {
    const [value, setValue] = useAtom(accessAtom);
    return (<>
        <div>
            {label}
        </div>

        <input
            className={classNames(optionRowInputClasses, inputRingClasses, className)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...rest}
        />
    </>);
}

export function OptionRowCheck<T extends PrimitiveAtom<boolean>>({ label, accessAtom, className, ...rest }: OptionRowInputProps<T>) {
    const [value, setValue] = useAtom(accessAtom);
    return (<>
        <div>
            {label}
        </div>

        <input
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            type="checkbox"
            checked={value}
            onChange={() => setValue(v => !v)}
            {...rest}
        />
    </>);
}

const optionRowInputClasses = "\
px-2 py-1 h-6 \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-hidden";
