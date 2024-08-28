import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props/0-all";

export function ManualFields({ maniAtoms, formAtoms, formIdx }: MFormContextProps) {
    const items = useAtomValue(formAtoms.manual.chunks);
    return (<>
        <div className="">
            <ManualPanelActions maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
            <ManualPanelProps maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </div>
    </>);
}
