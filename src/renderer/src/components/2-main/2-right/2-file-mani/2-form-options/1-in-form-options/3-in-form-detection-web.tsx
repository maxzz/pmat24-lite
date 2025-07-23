import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { MatchHow } from "./5-2-match-how";
import { useIsShowExample } from "./5-9-set-atoms";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const { ourlAtom, rurlAtom } = oFormProps.oAllAtoms.options.p2Detect;

    const showExample = useIsShowExample(oFormProps.oAllAtoms.options);

    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows stateAtom={ourlAtom} label="Original website URL (readonly)" asTextarea readOnly />

                <div className="mt-4">How to match URL:</div>
                <MatchHow oFormProps={oFormProps} />

                <InputWithTitle2Rows stateAtom={rurlAtom} label="Match URL" asTextarea />

                {showExample && (<>
                    <div className="mt-1">
                        Now the match URL is a regular expression and equal to the original URL.
                        It is recommended to specify the match URL as a part of original URL.
                    </div>

                    <div className="mt-1">
                        For example:
                        for <span className={exampleClasses}>https://login.example.com</span> the match URL as regular expression can be: <span className={exampleClasses}>login</span>.
                        That will not be match <span className={exampleClasses}>https://admin.example.com/login</span>.
                    </div>
                </>)}

            </div>
        </AccordionWithTrigger>
    );
}

const textClasses = "pl-6 pr-0.5";
const exampleClasses = "text-blue-500";
