import { atom } from "jotai";
import { Matching } from "@/store/manifest";
import { setAtomRowInputState } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/1-atoms/2-file-mani-atoms/4-options";

export const setUrlsEditorDataAtom = atom(
    null,
    (get, set, { options, o, how, opt, url }: { options: FormOptionsState.AllAtoms, o?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const detect = options.p2Detect

        if (o !== undefined) {
            setAtomRowInputState(detect.ourlAtom, o, get, set);
        }

        if (how !== undefined || opt !== undefined || url !== undefined) {
            const current: Matching.RawMatchData = { how: get(options.howAtom), opt: get(options.optAtom), url: get(detect.rurlAtom).data };

            if (how !== undefined) {
                current.how = how;
                set(options.howAtom, how);

                if (how === Matching.How.undef) {
                    setAtomRowInputState(detect.rurlAtom, get(detect.ourlAtom).data, get, set);
                }
            }
            if (opt !== undefined) {
                current.opt = opt;
                set(options.optAtom, opt);
            }
            if (url !== undefined) {
                current.url = url;
                setAtomRowInputState(detect.rurlAtom, url, get, set);
            }

            setAtomRowInputState(detect.murlAtom, Matching.stringifyRawMatchData(current, get(detect.ourlAtom).data), get, set);
        }
    }
);

export const showExampleAtom = atom(
    null,
    (get, set, options: FormOptionsState.AllAtoms): boolean | undefined => {
        const how = get(options.howAtom);
        if (how === Matching.How.regex) {
            const o = get(options.p2Detect.ourlAtom).data;
            const r = get(options.p2Detect.rurlAtom).data;
            return o === r;
        }
    }
);
