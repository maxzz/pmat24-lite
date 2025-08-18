import { type HTMLAttributes, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { type FieldRowCtx } from "@/store/2-file-mani-atoms";
import { PolicyAction, getPolicyExplanation, getPolicyBtnText } from "@/store/4-dialogs-atoms";
import { Button } from "@/ui";
import { PolicyEditorDlg } from "@/components/4-dialogs";

export function Column6_Policy({ rowCtx, className, onClick: enableRowClick, ...rest }: { rowCtx: FieldRowCtx; } & HTMLAttributes<HTMLButtonElement>) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;

    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const openDlgAtom = useState(() => atom(false))[0];
    const setDlgOpen = useSetAtom(openDlgAtom);

    const useIt = useAtomValue(useItAtom);
    const ftyp = useAtomValue(typeAtom);
    const policies = useAtomValue(policiesAtom);

    const action = getPolicyExplanation(policies.policy, policies.policy2, ftyp);

    if (action === PolicyAction.hide) {
        return <div className="text-center" />;
    }

    return (<>
        <Button
            className={classNames(Column6_PolicyClasses, !useIt && "opacity-30 cursor-pointer", className)}
            onClick={(e) => { enableRowClick?.(e); setDlgOpen(true); }}
            {...rest}
        >
            {getPolicyBtnText(action)}...
        </Button>

        <PolicyEditorDlg
            openAtom={openDlgAtom}
            toastIdAtom={toastIdAtom}
            policiesAtom={policiesAtom}
        />
    </>);
}

const Column6_PolicyClasses = "\
px-2 py-3 w-24 h-7 text-[.65rem] \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
ring-mani-ring \
focus:ring-1 \
focus:ring-offset-1 \
focus:ring-offset-mani-background \
focus:ring-mani-ring-activated \
\
rounded outline-none \
flex items-center justify-center gap-0.5";

//TODO: add default text 'Give me a name' or 'No name, give me one';
