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
        const title1 = `%c 🍵 Render field of "${formIdx === FormIdx.login ? 'login' : 'cpass'}" form. fileUsAtom:%c${ctx.fileUsAtom.toString()}`;
        const title3 = `${title1}\n    %clogin: ${fileUs.hwndLoginAtom.toString()} ${JSON.stringify(loginHwnd)}\n    cpass: ${fileUs.hwndCpassAtom.toString()} ${JSON.stringify(cpassHwnd)}`;

        console.log(title3, 'color: magenta', 'color: green', 'color: silver');
    }
);
