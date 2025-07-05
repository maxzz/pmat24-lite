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
                                printFormField(formIdx, get(chunk.rowCtx.labelAtom), chunk.rowCtx.metaField.uuid);
                                return chunk.rowCtx;
                            }
                        }
                    )
                    .filter(Boolean);
            }
            return fields || [];
        }
    );
    return rv;
}

function printFormField(formIdx: FormIdx, label: string, uuid: number) {
    console.log(`  %c👀 FormField: ${uuid} %c${!formIdx ? 'login' : 'cpass'} %c'${label}'`, 'font-size:0.5rem', !formIdx ? 'color: forestgreen' : 'color: darkseagreen', 'color: black');
}
