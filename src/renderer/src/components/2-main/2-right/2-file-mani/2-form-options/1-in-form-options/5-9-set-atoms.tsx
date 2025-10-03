import { useEffect, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Matching } from "@/store/manifest";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

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
