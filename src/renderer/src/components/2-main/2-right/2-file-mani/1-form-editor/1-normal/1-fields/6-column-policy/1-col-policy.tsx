import { type HTMLAttributes, useState } from "react";
import { type PrimitiveAtom, atom, useAtomValue, useSetAtom } from "jotai";
import { type FieldTyp, type Mani } from "@/store/manifest";
import { PolicyAction, getPolicyExplanation, getPolicyBtnText } from "@/store/1-atoms/2-file-mani-atoms";
import { PolicyEditorDlg } from "@/components/4-dialogs";
import { Button } from "@/ui";
import { classNames } from "@/utils";

type Column6_LabelProps = HTMLAttributes<HTMLButtonElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    typeAtom: PrimitiveAtom<FieldTyp>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

export function Column6_Policy({ useItAtom, typeAtom, policiesAtom, className, onClick: enableRowClick, ...rest }: Column6_LabelProps) {
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
px-2 py-3 h-7 text-[.65rem] \
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
