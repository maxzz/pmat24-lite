import { Atomize } from "@/util-hooks";
import { Meta, ScriptChunkEditorData, parseForEditor } from "pm-manifest";
import { NormalFieldConv } from "../../1-normal-field-atoms/0-conv";
import { newAtomForCheck, newAtomForInput, OnChangeValueWithPpdateName, validateNumber } from "@/ui/local-ui/1-input-validate";
import { ManualField } from "./9-types";

export function forAtoms(fields: Meta.Field[]): ScriptChunkEditorData[] {
    const chunks = parseForEditor(fields);
    return chunks;
}

export function createAtoms(initialState: ScriptChunkEditorData[], onChange: OnChangeValueWithPpdateName): ManualField.ScriptTypesAtoms[] {

    const scriptAtoms = initialState.map(
        (chunk, idx) => {
            switch (chunk.type) {
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
                case "dly": {
                    const rv: ManualField.DlyForAtoms = {
                        type: 'dly',
                        nAtom: newAtomForInput(chunk.n, onChange('man-dly-dly'), { validate: validateNumber }),
                    };
                    return rv;
                }
                case "fld": {
                    const fieldforAtoms: NormalFieldConv.FieldForAtoms = NormalFieldConv.forAtoms(chunk.field);
                    const fld: Atomize<NormalFieldConv.FieldForAtoms> = NormalFieldConv.createAtoms(fieldforAtoms, () => onChange(`man-fld-${idx}`));
                    const embFld: NormalFieldConv.FieldAtoms = {
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
    );

    return scriptAtoms;
}
