import { type Meta, type ScriptChunkEditorData, parseForEditor } from "pm-manifest";

export function forAtoms(fields: Meta.Field[]): ScriptChunkEditorData[] {
    const chunks = parseForEditor(fields);
    return chunks;
}
