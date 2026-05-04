import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { FormIdx } from "@/store/8-manifest";
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
                    <BlockQuickLinkContent_Guarded oFormProps={oFormProps} />
                )
            }
        </AccordionWithTrigger>
    );
}

function BlockQuickLinkContent_Guarded({ oFormProps }: { oFormProps: OFormProps; }) {
    const { qUseAtom, qNameAtom, qUrlAtom } = oFormProps.oAllAtoms.options.p4QL;

    return (
        <div className={textClasses}>
            <InputWithTitle2Rows
                asCheckbox
                stateAtom={qUseAtom}
                label="Show on mini-dashboard"
                labelClasses="font-normal"
                containerClasses="py-0!"
            />
            <InputWithTitle2Rows
                stateAtom={qNameAtom}
                label="Quick link name"
                labelClasses="font-normal"
                containerClasses="py-0!"
            />
            <InputWithTitle2Rows
                asTextarea
                stateAtom={qUrlAtom}
                label="Quick link URL"
                labelClasses="font-normal"
                containerClasses="py-0!"
            />
        </div>
    );
}

const textClasses = "pl-6 pr-0.5 py-3 text-balance grid gap-1.5";

//TODO: original url with % is that OK?
