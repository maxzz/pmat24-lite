import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUsCtx } from "@/store/1-file-mani-atoms";
import { type HighlightHwnd } from "@/store/store-types";

export function usePrintFileUsHwnds({ ctx }: { ctx: FileUsCtx; }) {
    const loginHwnd = useAtomValue(ctx.fileUs.hwndLoginAtom);
    const cpassHwnd = useAtomValue(ctx.fileUs.hwndCpassAtom);

    const doFileUsHwnds = useSetAtom(doFileUsHwndsAtom);

    useEffect(
        () => {
            doFileUsHwnds({ ctx });
        }, [loginHwnd, cpassHwnd]
    );
}

const doFileUsHwndsAtom = atom(
    null,
    (get, set, { ctx }: { ctx: FileUsCtx; }): void => {
        const fileUs = ctx.fileUs;
        const formIdx = ctx.formIdx;

        const loginHwnd = get(fileUs.hwndLoginAtom);
        const cpassHwnd = get(fileUs.hwndCpassAtom);

        printHwns({ ctx, loginHwnd, cpassHwnd });
    }
);

function printHwns({ ctx, loginHwnd, cpassHwnd }: { ctx: FileUsCtx; loginHwnd: HighlightHwnd | undefined; cpassHwnd: HighlightHwnd | undefined; }) {
    const fileUs = ctx.fileUs;
    const formIdx = ctx.formIdx;

    const first = `%c 🍵 Render field of "${formIdx === FormIdx.login ? 'login' : 'cpass'}" form. fileUsAtom:%c${ctx.fileUsAtom.toString()}`;

    const titleL = `login: ${fileUs.hwndLoginAtom.toString()} hwnd: ${loginHwnd ? `"${JSON.stringify(loginHwnd)}"` : undefined}`;
    const titleC = `cpass: ${fileUs.hwndCpassAtom.toString()} hwnd: ${cpassHwnd ? `"${JSON.stringify(loginHwnd)}"` : undefined}`;

    console.log(`${first}   %c${titleL}%c   %c${titleC}`, 'color: magenta; font-size:0.55rem', 'color: green', 'color: silver; font-size:0.55rem', 'color: gray', 'color: silver; font-size:0.55rem');
}
