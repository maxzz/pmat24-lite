import { useAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { FormRowChildren, InputWithTitle2Rows, SelectTm } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { FormIdx, type OptionTextValue } from "@/store/8-manifest";
import { InFormAccordionValue } from "@/store/2-file-mani-atoms/9-types";

export function BlockQuickLink({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;

    return (
        <AccordionWithTrigger name={InFormAccordionValue.quickLink} formIdx={formIdx} triggerText="Quick link on mini-dashboard" triggerClasses="w-auto">
            {formIdx !== FormIdx.login
                ? (
                    <div className={textClasses}>
                        The quick link is available only for the login form.
                    </div>
                )
                : (
                    <div className={textClasses}>
                        <BlockQuickLinkContent_Guarded oFormProps={oFormProps} />
                    </div>
                )
            }
        </AccordionWithTrigger>
    );
}

// display on mini-dashboard boolean
// quick link name string
// quick link URL string
//TODO: original url with % is that OK?

function BlockQuickLinkContent_Guarded({ oFormProps }: { oFormProps: OFormProps; }) {
    const { qUseAtom, qNameAtom, qUrlAtom } = oFormProps.oAllAtoms.options.p4QL;
    return (
        <div className={textClasses}>
            <InputWithTitle2Rows
                asCheckbox
                stateAtom={qUseAtom}
                label="Show on mini-dashboard"
                labelClasses="font-normal"
            />
            <InputWithTitle2Rows
                stateAtom={qNameAtom}
                label="Quick link name"
                labelClasses="font-normal"
            />
            <InputWithTitle2Rows
                asTextarea
                stateAtom={qUrlAtom}
                label="Quick link URL"
                labelClasses="font-normal"
            />
        </div>
    );
}

const textClasses = "pl-3 pr-0.5 py-1 text-balance";


/*
export function BlockWrap_Quicklink({ oFormProps }: { oFormProps: OFormProps; }) {
    const name = "ql";
    const { formIdx } = oFormProps.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.opened[openedName(formIdx, name)];

    return (<>
        <OptionsSubSectionTitle label="Quick link" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block3_QL atoms={oFormProps.oAllAtoms.options} />
        </UiAccordion>
    </>);
}

import { type OptionsState } from "@/store/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block3_QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUrlAtom } = atoms.p4QL;

    return (<>
        <InputWithTitle2Cols stateAtom={qNameAtom} label="Name on the mini-dashboard" /> {/* "Name displayed on the mini-dashboard" * /}
        <InputWithTitle2Cols stateAtom={qUrlAtom} label="Quick link URL" />

        {/* No need to show checkbox. We can update checkbox by content of mini-dashboard name * /}
        {/* <InputWithTitle2Cols stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox /> * /}
    </>);
}
*/
