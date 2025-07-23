import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { MatchMurl } from "./5-2-url-match";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const { ourlAtom, murlAtom, } = oFormProps.oAllAtoms.options.p2Detect;
    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows stateAtom={ourlAtom} label="Original URL (readonly)" asTextarea readOnly />

                <div className="">How to match URL:</div>
                <MatchMurl oFormProps={oFormProps} />

                <InputWithTitle2Rows stateAtom={murlAtom} label="Match URL" asTextarea />
            </div>
        </AccordionWithTrigger>
    );
}

const textClasses = "pl-6 pr-0.5";
