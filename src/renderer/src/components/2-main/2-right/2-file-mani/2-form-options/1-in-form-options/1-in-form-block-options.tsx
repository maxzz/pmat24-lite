import { useAtomValue } from "jotai";
import { type OFormContextProps, type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { DetectionContent_Web, DetectionContent_W32, PMIcon_W32 } from "./2-in-form-option-blocks";

export function InFormBlockOptions({ n_m_ctx }: { n_m_ctx: NFormContextProps | MFormContextProps; }) {
    const oAllAtoms = n_m_ctx.maniAtoms?.[n_m_ctx.formIdx];
    if (!oAllAtoms) {
        return null;
    }
    
    const ctx: OFormContextProps = { maniAtoms: n_m_ctx.maniAtoms, oAllAtoms, formIdx: n_m_ctx.formIdx };

    return (<>
        <FormDetection ctx={ctx} />
        {/* <FormW32Icon ctx={ctx} /> */}
    </>);
}

function FormDetection({ ctx }: { ctx: OFormContextProps; }) {
    const isWeb = useAtomValue(ctx.oAllAtoms.options.isWebAtom);
    const formIdx = ctx.oAllAtoms.options.formIdx;
    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            {isWeb
                ? <DetectionContent_Web ctx={ctx} />
                : <DetectionContent_W32 ctx={ctx} />
            }
        </AccordionWithTrigger>
    );
}

function FormW32Icon({ ctx }: { ctx: OFormContextProps; }) {
    const isWeb = useAtomValue(ctx.oAllAtoms.options.isWebAtom);
    const formIdx = ctx.oAllAtoms.options.formIdx;
    if (isWeb) {
        return null;
    }
    return (
        <AccordionWithTrigger name='form-icon' formIdx={formIdx} triggerText="Password Manager Icon">
            <PMIcon_W32 ctx={ctx} />
        </AccordionWithTrigger>
    );
}
