import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { rightPanelAtomAtom } from "@/store/5-right-panel";
import { FcViewBody } from "./1-cat-body";

export function Body_Cat(props: HTMLAttributes<HTMLDivElement>) {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    if (!fileUsAtom) {
        return null;
    }

    const fileUs = useAtomValue(fileUsAtom);
    const fceCtx = fileUs.fceAtomsForFcFile?.viewFceCtx;
    if (!fceCtx) {
        return <div {...props}>No body</div>;
    }

    return (
        <FcViewBody fceCtx={fceCtx} {...props} />
    );
}
