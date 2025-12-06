import { useAtom, useAtomValue } from "jotai";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { FormRowChildren, SelectTm } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { type OptionTextValue } from "@/store/8-manifest";

export function FormIconPosition({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);

    return (
        <AccordionWithTrigger name='form-icon' formIdx={formIdx} triggerText="Password Manager Icon">
            {isWeb
                ? (
                    <div className={textClasses}>
                        Icon position cannot be changed for web applications.
                    </div>
                )
                : (
                    <PMIcon_W32 oFormProps={oFormProps} />
                )
            }
        </AccordionWithTrigger>
    );
}

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

const textClasses = "pl-6 pr-0.5 py-1";

