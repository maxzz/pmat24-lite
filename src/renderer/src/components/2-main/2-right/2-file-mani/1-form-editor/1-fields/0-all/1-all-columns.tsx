import { FormIdx } from "@/store/store-types";
import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";
import { ManiAtoms } from "../../../0-all/0-create-ui-atoms/9-types";

export function TabFields({ maniAtoms, formIdx }: { maniAtoms: ManiAtoms; formIdx: FormIdx; }) {

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    if (!formAtoms.fieldsAtoms.length) {
        return (
            <NoFileds formType={formIdx} />
        );
    }

    return (
        <div>
            <FieldsGrid formAtoms={formAtoms} />
        </div>
    );
}
