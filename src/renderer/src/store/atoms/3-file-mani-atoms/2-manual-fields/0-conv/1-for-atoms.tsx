import { type Meta, type EditorDataForOne, parseForEditor } from "@/store/manifest";

export function forAtoms(metaFields: Meta.Field[]): EditorDataForOne[] {
    const chunks = parseForEditor(metaFields);
    return chunks;
}
