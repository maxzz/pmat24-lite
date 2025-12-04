import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";

export function ErrorInfo({ className, errorTextAtom, ...rest }: { errorTextAtom: PA<string>; } & HTMLAttributes<HTMLDivElement>) {
    const errorText = useAtomValue(errorTextAtom);
    return (
        <div className={classNames("mt-1 min-h-4 text-red-500 select-text", !errorText && "invisible", className)} {...rest}>
            {errorText}
        </div>
    );
}

//TODO: we show if generated password is valid or not, but we need to show how strong it is as well
