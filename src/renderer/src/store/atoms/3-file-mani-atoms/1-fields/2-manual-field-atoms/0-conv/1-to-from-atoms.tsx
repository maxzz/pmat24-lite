import { type Getter, type Setter } from "jotai";
import { type Atomize } from "@/util-hooks";
import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos, Meta, ScriptChunkEditorData, parseForEditor } from "pm-manifest";
import { NormalFieldConv, type NormalField } from "../../1-normal-field-atoms/0-conv";
import { newAtomForCheck, newAtomForInput, OnChangeValueWithPpdateName, validateNumber } from "@/ui/local-ui/1-input-validate";
import { type ManualField } from "./9-types";
import { ManiConv } from "../../../0-all/2-save-main-atom/2-conv-mani";

export function createAtom(chunk: ScriptChunkEditorData, idx: number, onChange: OnChangeValueWithPpdateName) {
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
            const fieldforAtoms: NormalField.FieldForAtoms = NormalFieldConv.forAtoms(chunk.field);
            const fld: Atomize<NormalField.FieldForAtoms> = NormalFieldConv.createAtoms(fieldforAtoms, () => onChange(`man-fld-${idx}`));
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

export function fromAtom(scriptItem: ManualField.ScriptTypesAtoms, get: Getter, set: Setter): ScriptChunkEditorData {
    switch (scriptItem.type) {
        case "kbd": {
            const char = get(scriptItem.charAtom);
            const repeat = get(scriptItem.repeatAtom);
            const shift = get(scriptItem.shiftAtom);
            const ctrl = get(scriptItem.ctrlAtom);
            const alt = get(scriptItem.altAtom);
            const rv: EditorDataForKbd = {
                type: 'kbd',
                char: char.data,
                repeat: +repeat.data,
                shift: +shift.data,
                ctrl: +ctrl.data,
                alt: +alt.data,
            };
            return rv;
        }
        case "pos": {
            const x = get(scriptItem.xAtom);
            const y = get(scriptItem.yAtom);
            const units = get(scriptItem.unitsAtom);
            const res = get(scriptItem.resAtom);
            const rv: EditorDataForPos = {
                type: 'pos',
                x: +x.data,
                y: +y.data,
                units: !!units.data,
                res: +res.data,
            };
            return rv;
        }
        case "dly": {
            const n = get(scriptItem.nAtom);
            const rv: EditorDataForDly = {
                type: 'dly',
                n: +n.data,
            };
            return rv;
        }
        case "fld": {
            // const fromAtomValues: NormalField.FieldForAtoms = NormalFieldConv.fromAtoms(atom.field, get, set);
            // const maniValues = NormalFieldConv.forMani(fromAtomValues);
            // const fileValues = ManiConv.fieldForFileMani(maniValues, fieldAtoms.metaField, undefined, false);

            //TODO: this is not correct, need to get the field values from the atom
            const rv: EditorDataForFld = {
                type: 'fld',
                field: scriptItem.field.metaField,
            };
            return rv;
        }
    }
}
