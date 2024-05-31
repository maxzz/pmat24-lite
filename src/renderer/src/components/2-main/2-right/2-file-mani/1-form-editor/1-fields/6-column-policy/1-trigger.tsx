import { HTMLAttributes, useState } from 'react';
import { PrimitiveAtom, atom, useAtomValue, useSetAtom } from 'jotai';
import { Meta } from 'pm-manifest';
import { PolicyAction, getPolicyExplanation, getPolicyExplanationText } from '@/store/atoms/3-file-mani-atoms';
import { TwoFieldPoliciesForAtoms } from '@/store/atoms/7-dialogs';
import { PolicyEditorNewDlg } from '@/components/4-dialogs';
import { Button } from '@/ui';
import { classNames } from '@/utils';

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

type Column6_LabelProps = HTMLAttributes<HTMLButtonElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    policiesAtom: PrimitiveAtom<TwoFieldPoliciesForAtoms>;
    metaField: Meta.Field;
};

export function Column6_Policy({ useItAtom, policiesAtom, metaField, className, onClick: enableRowClick, ...rest }: Column6_LabelProps) {
    const openDlgAtom = useState(() => atom(false))[0];
    const setDlgOpen = useSetAtom(openDlgAtom);

    const useIt = useAtomValue(useItAtom);
    const policies = useAtomValue(policiesAtom);

    const action = getPolicyExplanation(policies.policy, policies.policy2, metaField);

    if (action === PolicyAction.na) {
        return <div className="text-center" />;
    }

    const text = getPolicyExplanationText(action);

    return (<>
        <Button
            className={classNames(Column6_PolicyClasses, !useIt && "opacity-30 cursor-pointer", className)}
            onClick={(e) => { enableRowClick?.(e); setDlgOpen(true); }}
            {...rest}
        >
            {text}...
        </Button>

        <PolicyEditorNewDlg
            openAtom={openDlgAtom}
            dataAtom={policiesAtom}
        />
    </>);
}

//TODO: add default text 'Give me a name' or 'No name, give me one';