import { atom } from "jotai";
import { Matching } from "@/store/manifest";
import { setRowInputStateAtomValue as setValue } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

export const setOtherPartsAfterHowChangedAtom = atom(
    null,
    (get, set, { options, o, how, opt, url }: { options: FormOptionsState.AllAtoms, o?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const getset = { get, set };
        const { ourlAtom, murlAtom } = options.p2Detect;
        const { murl_howAtom, murl_optAtom, murl_regexAtom } = options; // parts of string 'how:opt:url'

        if (o !== undefined) {
            setValue(ourlAtom, o, getset);
        }

        if (how === undefined && opt === undefined && url === undefined) {
            return;
        }

        const current: Matching.RawMatchData = { how: get(murl_howAtom), opt: get(murl_optAtom), url: get(murl_regexAtom).data };

        if (how !== undefined) {
            current.how = how;
            set(murl_howAtom, how);

            if (how === Matching.How.undef) {
                setValue(murl_regexAtom, get(ourlAtom).data, getset);
            }
        }

        if (opt !== undefined) {
            current.opt = opt;
            set(murl_optAtom, opt);
        }

        if (url !== undefined) {
            current.url = url;
            setValue(murl_regexAtom, url, getset);
        }

        setValue(murlAtom, Matching.stringifyRawMatchData(current, get(ourlAtom).data), getset);
    }
);
