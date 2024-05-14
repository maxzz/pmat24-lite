import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { classNames, turnOffAutoComplete } from '@/utils';
import { FieldConv } from '@/store/atoms/3-file-mani-atoms/1-fields/0-conv';
import { Button } from '@/ui';
import { PolicyAction, getPolicyExplanation, getPolicyExplanationText } from '@/store/atoms/3-file-mani-atoms';
import { Meta } from 'pm-manifest';
import { SymbolEllipsis } from '@/ui/icons';
import { PoliciesForAtoms, policyDialogOpenAtom } from '@/store/atoms/7-dialogs';
import { PolicyEditorNewDlg } from '@/components/4-dialogs';

const Column6_PolicyClasses = "\
px-2 py-3 h-7 \
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
flex items-center justify-center gap-0.5 \
outline-none \
rounded \
";

type Column6_LabelProps = HTMLAttributes<HTMLButtonElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    policiesAtom: PrimitiveAtom<PoliciesForAtoms>;
    metaField: Meta.Field;
};

export function Column6_Policy({ useItAtom, policiesAtom, metaField, className, ...rest }: Column6_LabelProps) {

    // const [open, setOpen] = useAtom(policyDialogOpenAtom);
    const setOpen = useSetAtom(policyDialogOpenAtom);

    console.log('Column6_Policy');
    const useIt = true;
    // console.log('Column6_Policy', 'open', open);

    // const [value, setValue] = useAtom(policiesAtom);
    // const useIt = useAtomValue(useItAtom);

    // const action = getPolicyExplanation(value.policy, value.policy2, metaField);
    // const text = getPolicyExplanationText(action);

    // if (action === PolicyAction.na) {
    //     return <div className="text-center"></div>;
    // }

    return (
        <Button
            className={classNames(Column6_PolicyClasses, !useIt && "opacity-30 cursor-pointer", className)}
            onClick={() => setOpen(true)}
            // {...rest}
        >
            <div className="text-[.65rem]">Add...</div>
            {/* <div className="text-[.65rem]">Edit...</div> */}

            {/* {text} */}
            {/* <div className="text-[.65rem]">Create</div> */}
            {/* <div className="text-[.65rem]">None</div> */}

            {/* <SymbolEllipsis className="size-3 rotate-90" /> */}

            <PolicyEditorNewDlg dataAtom={policiesAtom} />
        </Button>
    );
}

//TODO: add default text 'Give me a name' or 'No name, give me one';

{/* <input
className={classNames(Column6_PolicyClasses, !useIt && "opacity-30 cursor-pointer", className)}
value={value}
onChange={(event) => setValue(event.target.value)}
title={useIt ? "This is the label that appears next to the value entry field." : undefined}
{...turnOffAutoComplete}
{...rest}
/> */}
