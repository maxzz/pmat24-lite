import { atom, useAtomValue, useSetAtom } from "jotai";
import { InputSelectUi } from "@/ui";
import { Matching, type OptionTextValue } from "@/store/manifest";
import { setAtomRowInputState } from "@/ui/local-ui/1-input-validate";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";
import { type OFormProps } from "@/store/2-file-mani-atoms/9-types";

export function MatchHow({ oFormProps }: { oFormProps: OFormProps; }) {
    const setOtherPartsAfterHowChanged = useSetAtom(setOtherPartsAfterHowChangedAtom);
    const { options } = oFormProps.oAllAtoms;
    const how = useAtomValue(options.howAtom);
    const items = getNamesList(how);

    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={items}
            value={`${how}`}
            onValueChange={(value) => setOtherPartsAfterHowChanged({ options, how: +value })}
        />
    );
}

const setOtherPartsAfterHowChangedAtom = atom(
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

// UI companion

function getNamesList(how: Matching.How) {
    return how !== Matching.How.undef && how !== Matching.How.regex ? allHowNames : shortHowNames;
}

const shortHowNames: OptionTextValue[] = [
    ["As original URL",                                         /*0*/ "0"],
    ["Regular expression",                                      /*2*/ "2"],
];

const allHowNames: OptionTextValue[] = [
    ["Same as original url",                                    /*0*/ "0"],
    ["Match only domain of original url",                       /*1*/ "1"],
    ["Wildcard match",                                          /*3*/ "3"],
    ["Regular expresssion",                                     /*2*/ "2"],
    ["No domain match (Exclude this login from domain match)",  /*4*/ "4"],
];

// const inputAsRefClasses = "min-w-28 text-[0.6rem] !text-blue-400 cursor-pointer";
const inputAsRefClasses = "cursor-pointer";
