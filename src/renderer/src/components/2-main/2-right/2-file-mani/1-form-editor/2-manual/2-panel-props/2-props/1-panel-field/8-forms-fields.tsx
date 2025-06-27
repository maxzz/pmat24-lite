import { atom } from "jotai";
import { type FormFields, type FileUsCtx, type NormalField, cpassFieldsIdx, loginFieldsIdx, safeManiAtoms } from "@/store/1-atoms/2-file-mani-atoms";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";

export const doGetLinksAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx): readonly FormFields[] | undefined => {
        const maniAtoms = safeManiAtoms(get(fileUsCtx.fileUs.maniAtomsAtom));

        const currentForm = maniAtoms[fileUsCtx.formIdx];
        if (!currentForm) {
            return;
        }

        const rv = [
            get(maniAtoms[loginFieldsIdx]),
            get(maniAtoms[cpassFieldsIdx]),
        ] as const;

        return rv;
    }
);

const getLoginFormPswFieldsAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx): NormalField.RowCtx[] | undefined => {
        const loginFields = set(doGetLinksAtom, fileUsCtx)?.[FormIdx.login];
        if (!loginFields) {
            return;
        }

        const rv = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        return rv;
    }
);

export const buildDropdownFieldsAtom = atom(
    null,
    (get, set, rindexUuid: number, fileUsCtx: FileUsCtx): OptionTextValue[] => {
        const fields = set(getLoginFormPswFieldsAtom, fileUsCtx);

        set(printFieldsAtom, rindexUuid, fields);

        const rv = (fields || []).map<OptionTextValue>((field) => ([get(field.labelAtom), get(field.dbnameAtom)]));
        rv.unshift(['No link', '0']);
        return rv;
    }
);

const printFieldsAtom = atom(
    null,
    (get, set, rindexUuid: number, fields: NormalField.RowCtx[] | undefined) => {
        if (!fields) {
            return;
        }
        const all = fields.map((field) => `label:${get(field.labelAtom)} dbid:${get(field.dbnameAtom)}`);
        console.log(`for uuid:"${rindexUuid}" login fields:`, all);
    }
);
