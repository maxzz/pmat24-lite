import { type Atomize } from "@/util-hooks";
import { ScriptChunkEditorData } from "pm-manifest";
import { NormalFieldConv, type NormalField } from "../../1-normal-field-atoms/0-conv";
import { newAtomForCheck, newAtomForInput, OnChangeValueWithPpdateName, validateNumber } from "@/ui/local-ui/1-input-validate";
import { type ManualField } from "./9-types";

function createAtom(chunk: ScriptChunkEditorData, idx: number, onChange: OnChangeValueWithPpdateName) {
    switch (chunk.type) {
        case "kbd": {
            const rv: ManualField.KbdForAtoms = {
                type: 'kbd',
                charAtom: newAtomForInput(chunk.char, onChange('man-kbd-key')),
                repeatAtom: newAtomForInput(chunk.repeat, onChange('man-kbd-repeat'), { validate: validateNumber }),
                shiftAtom: newAtomForInput(chunk.shift, onChange('man-kbd-shift')),
                ctrlAtom: newAtomForInput(chunk.ctrl, onChange('man-kbd-ctrl')),
                altAtom: newAtomForInput(chunk.alt, onChange('man-kbd-alt')),
            };
            return rv;
        }
        case "pos": {
            const rv: ManualField.PosForAtoms = {
                type: 'pos',
                xAtom: newAtomForInput(chunk.x, onChange('man-pos-x'), { validate: validateNumber }),
                yAtom: newAtomForInput(chunk.y, onChange('man-pos-y'), { validate: validateNumber }),
                unitsAtom: newAtomForCheck(chunk.units, onChange('man-pos-units')),
                resAtom: newAtomForInput(chunk.res, onChange('man-pos-res'), { validate: validateNumber }),
            };
            return rv;
        }
        case "dly": {
            const rv: ManualField.DlyForAtoms = {
                type: 'dly',
                nAtom: newAtomForInput(chunk.n, onChange('man-dly-dly'), { validate: validateNumber }),
            };
            return rv;
        }
        case "fld": {
            const fieldforAtoms: NormalField.ForAtoms = NormalFieldConv.forAtoms(chunk.field);
            const fld: Atomize<NormalField.ForAtoms> = NormalFieldConv.createAtoms(fieldforAtoms, () => onChange(`man-fld-${idx}`));
            const embFld: NormalField.FieldAtoms = {
                ...fld,
                metaField: chunk.field,
                fromFile: fieldforAtoms,
                changed: false,
            };

            const rv: ManualField.FldForAtoms = {
                type: 'fld',
                field: embFld,
            };
            return rv;
        }
    }
}

export function createAtoms(initialState: ScriptChunkEditorData[], onChange: OnChangeValueWithPpdateName): ManualField.ForAtoms[] {
    const scriptAtoms = initialState.map((chunk, idx) => createAtom(chunk, idx, onChange));
    return scriptAtoms;
}
