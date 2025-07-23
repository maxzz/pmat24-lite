import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { MatchMurl } from "./7-url-match";
import { AccordionWithTrigger } from "@/ui/motion-primitives";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const { ourlAtom, murlAtom, } = oFormProps.oAllAtoms.options.p2Detect;
    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows stateAtom={ourlAtom} label="Original URL (readonly)" asTextarea readOnly />

                <div className="">How to match URL:</div>
                <MatchMurl />

                <InputWithTitle2Rows stateAtom={murlAtom} label="Match URL" asTextarea />
            </div>
        </AccordionWithTrigger>
    );
}

const textClasses = "pl-6 pr-0.5";
