import { atom, useAtomValue, useSetAtom } from "jotai";
import { Matching } from "@/store/manifest";
import { setAtomRowInputState } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/1-file-mani-atoms/3-options";
import { useEffect, useState } from "react";

export const setUrlsEditorDataAtom = atom(
    null,
    (get, set, { options, o, how, opt, url }: { options: FormOptionsState.AllAtoms, o?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const getset = { get, set };
        const detect = options.p2Detect;

        if (o !== undefined) {
            setAtomRowInputState(detect.ourlAtom, o, getset);
        }

        if (how !== undefined || opt !== undefined || url !== undefined) {
            const current: Matching.RawMatchData = { how: get(options.howAtom), opt: get(options.optAtom), url: get(detect.rurlAtom).data };

            if (how !== undefined) {
                current.how = how;
                set(options.howAtom, how);

                if (how === Matching.How.undef) {
                    setAtomRowInputState(detect.rurlAtom, get(detect.ourlAtom).data, getset);
                }
            }
            if (opt !== undefined) {
                current.opt = opt;
                set(options.optAtom, opt);
            }
            if (url !== undefined) {
                current.url = url;
                setAtomRowInputState(detect.rurlAtom, url, getset);
            }

            setAtomRowInputState(detect.murlAtom, Matching.stringifyRawMatchData(current, get(detect.ourlAtom).data), getset);
        }
    }
);

export function useIsShowExample(options: FormOptionsState.AllAtoms): boolean | undefined {
    const isShowExample = useSetAtom(isShowExampleAtom);
    const [showExample, setShowExample] = useState<boolean | undefined>(false);

    const how = useAtomValue(options.howAtom);
    const o = useAtomValue(options.p2Detect.ourlAtom);
    const r = useAtomValue(options.p2Detect.rurlAtom);

    useEffect(
        () => {
            setShowExample(isShowExample(options));
        }, [options, how, o, r]
    );

    return showExample;
}

const isShowExampleAtom = atom(
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
