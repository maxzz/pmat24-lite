import { type Meta, type ScriptChunkEditorData, parseForEditor } from "@/store/manifest";

export function forAtoms(metaFields: Meta.Field[]): ScriptChunkEditorData[] {
    const chunks = parseForEditor(metaFields);
    return chunks;
}
