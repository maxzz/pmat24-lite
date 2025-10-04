import { atom } from "jotai";
import { Matching } from "@/store/manifest";
import { setRowInputStateAtomValue as setValue } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

export const setOtherPartsAfterHowChangedAtom = atom(
    null,
    (get, set, { options, o, how, opt, url }: { options: FormOptionsState.AllAtoms, o?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const getset = { get, set };
        const { ourlAtom, murlAtom, rurlAtom: part_rurlAtom } = options.p2Detect;
        const { howAtom: part_howAtom, optAtom: part_optAtom } = options; // partHowAtom, partRurlAtom, partOptAtom are parts of string 'how + opt + url'

        if (o !== undefined) {
            setValue(ourlAtom, o, getset);
        }

        if (how === undefined && opt === undefined && url === undefined) {
            return;
        }

        const current: Matching.RawMatchData = { how: get(part_howAtom), opt: get(part_optAtom), url: get(part_rurlAtom).data };

        if (how !== undefined) {
            current.how = how;
            set(part_howAtom, how);

            if (how === Matching.How.undef) {
                setValue(part_rurlAtom, get(ourlAtom).data, getset);
            }
        }

        if (opt !== undefined) {
            current.opt = opt;
            set(part_optAtom, opt);
        }

        if (url !== undefined) {
            current.url = url;
            setValue(part_rurlAtom, url, getset);
        }

        setValue(murlAtom, Matching.stringifyRawMatchData(current, get(ourlAtom).data), getset);
    }
);
