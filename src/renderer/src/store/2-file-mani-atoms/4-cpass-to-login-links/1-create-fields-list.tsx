import { type Atom, atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type FieldRowCtx, type MFormCnt, type NFormCnt } from "../9-types";
import { print_FormFields } from "../8-print-fields";

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
            }

            print_FormFields(fields || [], formIdx, { label: '👀 from getter of fieldsAtom', labelCss: 'color: dimgray; font-size:0.6rem;', bodyCollapsed: true });
            return fields || [];
        }
    );
    return rv;
}
