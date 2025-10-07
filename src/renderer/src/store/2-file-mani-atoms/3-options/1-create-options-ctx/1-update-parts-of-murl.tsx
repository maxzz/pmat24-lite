import { atom } from "jotai";
import { Matching } from "@/store/manifest";
import { setRowInputStateAtomValue as setValue } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

export const setHowChangedAtom = atom(
    null,
    (get, set, { oFormCtx, how }: { oFormCtx: FormOptionsState.AllAtoms, how: Matching.How; }) => {
        const { p2Detect: { ourlAtom, murlAtom }, murl_howAtom, murl_optAtom, murl_regexAtom } = oFormCtx;

        const current: Matching.RawMatchData = { how, opt: +get(murl_optAtom).data, url: get(murl_regexAtom).data };
        setValue({
            stateAtom: murl_howAtom,
            value: `${how}`,
            getset: { get, set },
        });

        setValue({
            stateAtom: murlAtom,
            value: Matching.stringifyRawMatchData(current, get(ourlAtom).data),
            getset: { get, set },
        });
    }
);

export const updateAfterRegexUrlChangeAtom = atom(
    null,
    (get, set, { oFormCtx }: { oFormCtx: FormOptionsState.AllAtoms; }) => {
        const { p2Detect: { ourlAtom, murlAtom }, murl_howAtom, murl_optAtom, murl_regexAtom } = oFormCtx;

        const current: Matching.RawMatchData = { how: +get(murl_howAtom).data, opt: +get(murl_optAtom).data, url: get(murl_regexAtom).data };

        if (current.how === Matching.How.regex) {
            setValue({
                stateAtom: murlAtom,
                value: Matching.stringifyRawMatchData(current, get(ourlAtom).data),
                getset: { get, set },
                error: current.how === Matching.How.regex && !current.url.trim() ? 'Value cannot be empty.' : undefined,
            });
        }
    }
);
