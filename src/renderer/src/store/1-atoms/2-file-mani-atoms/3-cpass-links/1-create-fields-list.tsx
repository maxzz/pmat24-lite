import { type Atom, atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type MFormCnt, type NFormCnt } from "../9-types";

export function createFormFieldsAtom(normal: NFormCnt | undefined, manual: MFormCnt | undefined, formIdx: FormIdx): Atom<FieldRowCtx[]> {
    const rv = atom<FieldRowCtx[]>(
        (get) => {
            let fields: FieldRowCtx[] | undefined;
            if (normal) {
                fields = normal.rowCtxs;
            }
            if (manual) {
                fields = get(manual.chunksAtom)
                    .map(
                        (chunk) => {
                            if (chunk.type === 'fld') {
                                return chunk.rowCtx;
                            }
                        }
                    )
                    .filter(Boolean);
                //printFields(fields, formIdx, { get });
            }
            return fields || [];
        }
    );
    return rv;
}

function printFields(fields: FieldRowCtx[], formIdx: FormIdx, { get }: GetOnly) {
    console.log(
        `%c👀 Cretate.Form.Fields %c${!formIdx ? 'login (or cpass at create time)' : 'cpass'}`,
        'font-size:0.5rem',
        !formIdx ? 'color: forestgreen' : 'color: darkseagreen');

    const colors: string[] = [];
    const lines: string[] = [];

    fields.forEach(
        (field) => {
            lines.push(`%c        this.uuid: %c${field.metaField.uuid} %c'${get(field.labelAtom)}'`);
            colors.push('font-size:0.5rem; color: forestgreen', 'color: forestgreen', 'color: black');
        }
    );

    console.log(lines.join('\n'), ...colors);
}
