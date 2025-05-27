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
            doFileUsHwnds({ label: '', ctx });
        }, [loginHwnd, cpassHwnd]
    );
}

const doFileUsHwndsAtom = atom(
    null,
    (get, set, { label, ctx }: { label: string; ctx: FileUsCtx; }): void => {
        const fileUs = ctx.fileUs;
        const formIdx = ctx.formIdx;

        const loginHwnd = get(fileUs.hwndLoginAtom);
        const cpassHwnd = get(fileUs.hwndCpassAtom);
        const title1 = `${label}${formIdx === FormIdx.login ? 'login' : 'cpass'} ${ctx.fileUsAtom.toString()}`;
        const title2 = `${label}     `;

        console.log(`%c🍵  ${title1} hwnd login:`, 'color: magenta', loginHwnd);
        console.log(`%c🍵  ${title2} hwnd cpass:`, 'color: magenta', cpassHwnd);
    }
);
