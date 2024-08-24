import { FormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { ManualFields } from "../2-manual";

export function ManualFormTabContent({ maniAtoms, formAtoms, formIdx }: FormContextProps) {
    return (<>
        <ManualFields maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
    </>);
}