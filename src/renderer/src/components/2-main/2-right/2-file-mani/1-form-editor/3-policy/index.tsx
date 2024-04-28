import { FileUs, FormIdx } from "@/store/store-types";
import { ManiSection3_Policy } from "./0-all";
import { ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

export function TabPolicy({ maniAtoms, fileUs, formIdx }: { maniAtoms: ManiAtoms; fileUs: FileUs; formIdx: FormIdx; }) {
    return (
        <div className="ml-1">
            <ManiSection3_Policy maniAtoms={maniAtoms} fileUs={fileUs} formIdx={formIdx} />
        </div>
    );
}
