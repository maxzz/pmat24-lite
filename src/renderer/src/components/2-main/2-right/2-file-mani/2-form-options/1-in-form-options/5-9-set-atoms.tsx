import { atom } from "jotai";
import { Matching } from "@/store/manifest";
import { type FormOptionsState } from "@/store/1-atoms/2-file-mani-atoms/4-options";
import { RowInputState } from "@/ui/local-ui";

export const setUrlsEditorDataAtom = atom(
    null,
    (get, set, { options, o, how, opt, url }: { options: FormOptionsState.AllAtoms, o?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const detect = options.p2Detect

        if (o !== undefined) {
            set(detect.ourlAtom, (prev) => {
                const value = o;
                const rv: RowInputState = {
                    ...prev,
                    data: value,
                    error: prev.validate?.(value),
                    dirty: prev.initialData !== value,
                };
                return rv;
            });
        }

        if (how !== undefined || opt !== undefined || url !== undefined) {
            const current: Matching.RawMatchData = { how: get(options.howAtom), opt: get(options.optAtom), url: get(detect.rurlAtom).data };

            if (how !== undefined) {
                current.how = how;
                set(options.howAtom, how);

                if (how === Matching.How.undef) {
                    const orulSate = get(detect.ourlAtom);
                    const rv: RowInputState = {
                        ...orulSate,
                        data: orulSate.data,
                        error: orulSate.validate?.(orulSate.data),
                        dirty: orulSate.initialData !== orulSate.data,
                    };
                    set(detect.rurlAtom, rv);
                }
            }
            if (opt !== undefined) {
                current.opt = opt;
                set(options.optAtom, opt);
            }
            if (url !== undefined) {
                current.url = url;
                const rurlState = get(detect.rurlAtom);
                const rv: RowInputState = {
                    ...rurlState,
                    data: url,
                    error: rurlState.validate?.(url),
                    dirty: rurlState.initialData !== url,
                };
                set(detect.rurlAtom, rv);
            }

            set(detect.murlAtom, (prev) => {
                const murlState = get(detect.murlAtom);
                const newValue = Matching.stringifyRawMatchData(current, prev.data);
                const rv: RowInputState = {
                    ...murlState,
                    data: newValue,
                    error: murlState.validate?.(newValue),
                    dirty: murlState.initialData !== newValue,
                };
                return rv;
            });
        }
    }
);
