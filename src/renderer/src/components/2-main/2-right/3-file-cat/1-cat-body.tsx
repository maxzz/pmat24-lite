import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { classNames } from "@/utils";

export function FcViewBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {
    const fileUs = useAtomValue(fileUsAtom);
    return (
        <div className={classNames("h-full w-full", className)} {...rest}>
            1234
        </div>
    );
}
