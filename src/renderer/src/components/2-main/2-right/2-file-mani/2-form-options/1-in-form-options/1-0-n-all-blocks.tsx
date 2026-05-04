import { useAtomValue } from "jotai";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/2-file-mani-atoms";
import { DetectionContent_W32 } from "./1-1-0-detection-w32";
import { DetectionContent_Web } from "./1-2-0-detection-web";
import { BlockQuickLink } from "./3-quick-link";
import { FormIconPosition } from "./2-icon-position";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InFormAccordionValue } from "@/store/2-file-mani-atoms/9-types";

export function InFormBlockOptions({ anyFormProps }: { anyFormProps: NFormProps | MFormProps; }) {
    const anyFormCtx = (anyFormProps as NFormProps).nFormCtx || (anyFormProps as MFormProps).mFormCtx;
    const formIdx = anyFormCtx?.fileUsCtx.formIdx;

    const oAllAtoms = anyFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }

    const oFormProps: OFormProps = { maniAtoms: anyFormProps.maniAtoms, oAllAtoms };

    return (<>
        <BlockDetection oFormProps={oFormProps} />
        <FormIconPosition oFormProps={oFormProps} />
        <BlockQuickLink oFormProps={oFormProps} />
    </>);
}

export function BlockDetection({ oFormProps }: { oFormProps: OFormProps; }) {
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);
    const formIdx = oFormProps.oAllAtoms.options.formIdx;

    return (
        <AccordionWithTrigger name={InFormAccordionValue.detection} formIdx={formIdx} triggerText="Screen detection" triggerClasses="w-auto">
            <div className={textClasses}>
                {isWeb
                    ? <DetectionContent_Web oFormProps={oFormProps} />
                    : <DetectionContent_W32 oFormProps={oFormProps} />
                }
            </div>
        </AccordionWithTrigger>
    );
}

const textClasses = "pl-6 pr-0.5 py-1";
