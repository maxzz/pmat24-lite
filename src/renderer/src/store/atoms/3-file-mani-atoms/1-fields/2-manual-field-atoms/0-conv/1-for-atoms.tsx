import { type Meta, type ScriptChunkEditorData, parseForEditor } from "pm-manifest";

export function forAtoms(metaFields: Meta.Field[]): ScriptChunkEditorData[] {
    const chunks = parseForEditor(metaFields);
    return chunks;
}
