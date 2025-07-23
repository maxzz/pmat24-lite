import { useAtomValue } from "jotai";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { DetectionContent_Web, DetectionContent_W32, PMIcon_W32 } from "./2-in-form-option-blocks";

export function InFormBlockOptions({ anyFormProps }: { anyFormProps: NFormProps | MFormProps; }) {
    const anyProps = (anyFormProps as NFormProps).nFormCtx || (anyFormProps as MFormProps).mFormCtx;
    const formIdx = anyProps?.fileUsCtx.formIdx;
    const oAllAtoms = anyFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }
    
    const oFormProps: OFormProps = { maniAtoms: anyFormProps.maniAtoms, oAllAtoms };

    return (<>
        <FormDetectionSelector oFormProps={oFormProps} />
        {/* <FormW32IconPosition oFormProps={oFormProps} /> */}
    </>);
}

function FormDetectionSelector({ oFormProps }: { oFormProps: OFormProps; }) {

    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);
    const formIdx = oFormProps.oAllAtoms.options.formIdx;

    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            {isWeb
                ? <DetectionContent_Web oFormProps={oFormProps} />
                : <DetectionContent_W32 oFormProps={oFormProps} />
            }
        </AccordionWithTrigger>
    );
}

function FormW32IconPosition({ oFormProps }: { oFormProps: OFormProps; }) {

    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    if (isWeb) {
        return null;
    }

    return (
        <AccordionWithTrigger name='form-icon' formIdx={formIdx} triggerText="Password Manager Icon">
            <PMIcon_W32 oFormProps={oFormProps} />
        </AccordionWithTrigger>
    );
}
