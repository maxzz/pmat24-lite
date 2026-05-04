import { useAtom, useAtomValue } from "jotai";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { FormRowChildren, SelectTm } from "@/ui/local-ui";
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
                        Quick link is available only for login form.
                    </div>
                )
                : (
                    // <PMIcon_W32 oFormProps={oFormProps} />
                    <div className={textClasses}>
                        Soon...
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

function PMIcon_W32({ oFormProps }: { oFormProps: OFormProps; }) {
    const { idAtom, quadrandAtom } = oFormProps.oAllAtoms.options.p5Icon;

    const [state, setState] = useAtom(quadrandAtom);

    function onChange(newValue: string) {
        setState((prev) => {
            const rv = { ...prev, data: newValue, dirty: prev.initialData !== newValue, };
            return rv;
        });
    }

    return (
        <div className={textClasses}>
            <FormRowChildren label="Icon position">
                <SelectTm items={balloonCounterItems} value={state.data || '0'} onValueChange={onChange} />
            </FormRowChildren>

            {/* <InputWithTitle2Rows stateAtom={idAtom} label="Location ID (optional)" /> */}
        </div>
    );
}

const balloonCounterItems: OptionTextValue[] = [
    ['Default', '0'],
    ['Top left', '1'],
    ['Top right', '2'],
    ['Bottom left', '3'],
    ['Bottom right', '4'],
];

const textClasses = "pl-6 pr-0.5 py-1 text-balance";


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
