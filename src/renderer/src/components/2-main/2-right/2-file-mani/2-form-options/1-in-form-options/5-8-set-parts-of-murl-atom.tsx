import { atom } from "jotai";
import { Matching } from "@/store/manifest";
import { setAtomRowInputState } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

export const setOtherPartsAfterHowChangedAtom = atom(
    null,
    (get, set, { options, o, how, opt, url }: { options: FormOptionsState.AllAtoms, o?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const getset = { get, set };
        const { ourlAtom, murlAtom, rurlAtom: partRurlAtom } = options.p2Detect;
        const { howAtom: partHowAtom, optAtom: partOptAtom } = options; // partHowAtom, partRurlAtom, partOptAtom are parts of string 'how + opt + url'

        if (o !== undefined) {
            setAtomRowInputState(ourlAtom, o, getset);
        }

        if (how === undefined && opt === undefined && url === undefined) {
            return;
        }

        const current: Matching.RawMatchData = { how: get(partHowAtom), opt: get(partOptAtom), url: get(partRurlAtom).data };

        if (how !== undefined) {
            current.how = how;
            set(partHowAtom, how);

            if (how === Matching.How.undef) {
                setAtomRowInputState(partRurlAtom, get(ourlAtom).data, getset);
            }
        }

        if (opt !== undefined) {
            current.opt = opt;
            set(partOptAtom, opt);
        }

        if (url !== undefined) {
            current.url = url;
            setAtomRowInputState(partRurlAtom, url, getset);
        }

        setAtomRowInputState(murlAtom, Matching.stringifyRawMatchData(current, get(ourlAtom).data), getset);
    }
);
