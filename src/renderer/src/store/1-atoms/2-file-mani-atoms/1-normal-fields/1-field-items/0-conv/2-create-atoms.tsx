import { type Atomize, type OnValueChangeAny, atomWithCallback } from "@/utils";
import { EditorField } from "@/store/manifest";

export function createAtoms(initialState: EditorField.ForAtoms, onChange: OnValueChangeAny): Atomize<EditorField.ForAtoms> {
    const { useIt, label, type, dbname, valueLife, policies, rfield, rfieldIndex, rfieldForm } = initialState;

    const rv: Atomize<EditorField.ForAtoms> = {
        useItAtom: atomWithCallback(useIt, onChange),
        labelAtom: atomWithCallback(label, onChange),
        typeAtom: atomWithCallback(type, onChange),
        valueLifeAtom: atomWithCallback(valueLife, onChange),
        dbnameAtom: atomWithCallback(dbname, onChange),
        policiesAtom: atomWithCallback(policies, onChange),
        
        rfieldAtom: atomWithCallback(rfield, onChange),
        rfieldIndexAtom: atomWithCallback(rfieldIndex, onChange),
        rfieldUuidAtom: atomWithCallback(rfieldForm, onChange),
        rfieldFormAtom: atomWithCallback(rfieldForm, onChange),
    };

    return rv;
}
