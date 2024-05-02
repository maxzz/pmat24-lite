import { FileUs, FormIdx } from "@/store/store-types";
import { ManiSection3_Policy } from "./0-all";
import { FormAtoms, ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

export function TabPolicy({ maniAtoms, formAtoms, fileUs, formIdx }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; fileUs: FileUs; formIdx: FormIdx; }) {
    return (
        <div className="ml-1">
            <ManiSection3_Policy maniAtoms={maniAtoms} formAtoms={formAtoms} fileUs={fileUs} formIdx={formIdx} />
        </div>
    );
}
