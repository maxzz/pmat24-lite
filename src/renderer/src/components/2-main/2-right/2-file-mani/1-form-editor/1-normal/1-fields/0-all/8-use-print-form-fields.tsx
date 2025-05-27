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

        const first = `%c 🍵 Render field of "${formIdx === FormIdx.login ? 'login' : 'cpass'}" form. fileUsAtom:%c${ctx.fileUsAtom.toString()}`;
        
        const titleL = `login: ${fileUs.hwndLoginAtom.toString()} ${JSON.stringify(loginHwnd)}`;
        const titleC = `cpass: ${fileUs.hwndCpassAtom.toString()} ${JSON.stringify(cpassHwnd)}`;

        console.log(`${first}\n    %c${titleL}\n    ${titleC}`, 'color: magenta; font-size:0.55rem', 'color: green', 'color: silver');
    }
);
