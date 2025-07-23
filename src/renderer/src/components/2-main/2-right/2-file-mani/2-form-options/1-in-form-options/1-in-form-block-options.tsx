import { useAtomValue } from "jotai";
import { type OFormProps, type MFormProps, type NFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { DetectionContent_W32 } from "./2-in-form-detection-w32";
import { DetectionContent_Web } from "./3-in-form-detection-web";

export function InFormBlockOptions({ anyFormProps }: { anyFormProps: NFormProps | MFormProps; }) {
    const anyFormCtx = (anyFormProps as NFormProps).nFormCtx || (anyFormProps as MFormProps).mFormCtx;
    const formIdx = anyFormCtx?.fileUsCtx.formIdx;

    const oAllAtoms = anyFormProps.maniAtoms?.[formIdx];
    if (!oAllAtoms) {
        return null;
    }

    const oFormProps: OFormProps = { maniAtoms: anyFormProps.maniAtoms, oAllAtoms };
    const isWeb = useAtomValue(oFormProps.oAllAtoms.options.isWebAtom);

    return (<>
        {isWeb
            ? (
                <DetectionContent_Web oFormProps={oFormProps} />
            )
            : (
                <DetectionContent_W32 oFormProps={oFormProps} />
            )
        }
    </>);
}
