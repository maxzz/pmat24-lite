import { type Getter, type Setter } from "jotai";
import { Meta, ScriptChunkEditorData, parseForEditor } from "pm-manifest";
import { OnChangeValueWithPpdateName } from "@/ui/local-ui/1-input-validate";
import { ManualField } from "./9-types";
import { createAtom, fromAtom } from "./1-to-from-atoms";

export function forAtoms(fields: Meta.Field[]): ScriptChunkEditorData[] {
    const chunks = parseForEditor(fields);
    return chunks;
}

export function createAtoms(initialState: ScriptChunkEditorData[], onChange: OnChangeValueWithPpdateName): ManualField.ScriptTypesAtoms[] {
    const scriptAtoms = initialState.map((chunk, idx) => createAtom(chunk, idx, onChange));
    return scriptAtoms;
}

export function fromAtoms(scriptItems: ManualField.ScriptTypesAtoms[], get: Getter, set: Setter): ScriptChunkEditorData[] {
    const chunks = scriptItems.map((scriptItem) => fromAtom(scriptItem, get, set));
    return chunks;
}
