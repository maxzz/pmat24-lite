import { useAtomValue, useSetAtom } from "jotai";
import { InputSelectUi } from "@/ui";
import { Matching, type OptionTextValue } from "@/store/manifest";
import { type OFormProps } from "@/store/2-file-mani-atoms/9-types";
import { setOtherPartsAfterHowChangedAtom } from "./5-8-set-parts-of-murl-atom";

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
