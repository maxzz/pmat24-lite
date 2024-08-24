import { Atomize, AtomizeWithType, atomWithCallback, OnValueChangeAny } from "@/util-hooks";
import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos, Meta, ScriptChunkEditorData, parseForEditor } from "pm-manifest";
import { NormalFieldConv } from "../1-normal-field-atoms/0-conv";
import { newAtomForCheck, newAtomForInput, OnChangeValueWithPpdateName, RowInputState, validateNumber } from "@/ui/local-ui/1-input-validate";

export namespace ManualFieldConv {

    export type ActionKbdForAtoms = Omit<EditorDataForKbd, 'type'>;
    export type ActionPosForAtoms = Omit<EditorDataForPos, 'type'>;
    export type ActionDlyForAtoms = Omit<EditorDataForDly, 'type'>;
    export type ActionFldForAtoms = Omit<EditorDataForFld, 'type'>;

    export type FieldForAtoms = {
        scr: ScriptChunkEditorData;
    };

    export type KbdForAtoms = AtomizeWithType<ActionKbdForAtoms, RowInputState> & {
        type: 'kbd';
    };

    export type PosForAtoms = Prettify<AtomizeWithType<ActionPosForAtoms, RowInputState> & {
        type: 'pos';
    }>;

    export type DlyForAtoms = AtomizeWithType<ActionDlyForAtoms, RowInputState> & {
        type: 'dly';
    };

    export type FldForAtoms = {
        type: 'fld';
        field: NormalFieldConv.FieldAtoms;
    };

    export type ScriptTypesAtoms = KbdForAtoms | PosForAtoms | DlyForAtoms | FldForAtoms;

    export type ScriptAtoms = Prettify<
        & ScriptTypesAtoms
        & {
            metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: FieldForAtoms;    // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;

    export function forAtoms(fields: Meta.Field[]): ScriptChunkEditorData[] {
        const chunks = parseForEditor(fields);
        return chunks;
    }

    export function createAtoms(initialState: ScriptChunkEditorData[], onChange: OnChangeValueWithPpdateName): ScriptTypesAtoms[] {

        const scriptAtoms = initialState.map(
            (chunk, idx) => {
                switch (chunk.type) {
                    case "pos": {
                        const rv: PosForAtoms = {
                            type: 'pos',
                            xAtom: newAtomForInput(chunk.x, onChange('man-pos-x'), { validate: validateNumber }),
                            yAtom: newAtomForInput(chunk.y, onChange('man-pos-y'), { validate: validateNumber }),
                            unitsAtom: newAtomForCheck(chunk.units, onChange('man-pos-units')),
                            resAtom: newAtomForInput(chunk.res, onChange('man-pos-res'), { validate: validateNumber }),
                        };
                        return rv;
                    }
                    case "kbd": {
                        const rv: KbdForAtoms = {
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
                        const rv: DlyForAtoms = {
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

                        const rv: FldForAtoms = {
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
}
