import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { FormIdx } from "@/store/manifest";

export function usePrintFileUsHwnds({ ctx }: { ctx: FileUsCtx; }) {
    const loginHwnd = useAtomValue(ctx.fileUs.hwndLoginAtom);
    const cpassHwnd = useAtomValue(ctx.fileUs.hwndCpassAtom);

    const doFileUsHwnds = useSetAtom(doFileUsHwndsAtom);

    useEffect(
        () => {
            doFileUsHwnds({ label: ctx.formIdx === FormIdx.login ? 'login' : 'cpass', ctx });
        }, [loginHwnd, cpassHwnd]
    );
}

const doFileUsHwndsAtom = atom(
    null, 
    (get, set, {label, ctx}: { label: string; ctx: FileUsCtx; }): void => {
        const fileUs = ctx.fileUs;
        const formIdx = ctx.formIdx;

        const loginHwnd = get(fileUs.hwndLoginAtom);
        const cpassHwnd = get(fileUs.hwndCpassAtom);

        console.log(`%c💎                ${label} hwnd:`, 'color: magenta', loginHwnd, cpassHwnd);
    }
);
