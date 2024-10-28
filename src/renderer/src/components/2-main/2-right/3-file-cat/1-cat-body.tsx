import { type HTMLAttributes } from "react";
import { type FileUsAtom } from "@/store/store-types";
import { classNames } from "@/utils";

export function CatBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("h-full w-full bg-red-500", className)} {...rest}>
            1234
        </div>
    );
}
