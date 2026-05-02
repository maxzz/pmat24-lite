import { useAtomValue, useSetAtom } from "jotai";
import { Matching } from "@/store/8-manifest";
import { type SelectTmTextValue, SelectTm } from "@/ui/local-ui";
import { type OFormProps } from "@/store/2-file-mani-atoms/9-types";
import { setHowChangedAtom } from "@/store/2-file-mani-atoms/3-options/1-create-options-ctx/1-update-parts-of-murl";

export function MatchHow({ oFormProps }: { oFormProps: OFormProps; }) {
    const setHowChanged = useSetAtom(setHowChangedAtom);
    const { options } = oFormProps.oAllAtoms;
    const how = +useAtomValue(options.murl_howAtom).data;
    const items = getNamesList(how);

    return (
        <SelectTm
            triggerClasses={inputAsRefClasses}
            items={items}
            value={`${how}`}
            onValueChange={(value) => setHowChanged({ oFormCtx: options, how: +value })}
        />
    );
}

// UI companion

function getNamesList(how: Matching.How) {
    return how !== Matching.How.undef && how !== Matching.How.regex ? allHowNames : shortHowNames;
}

const shortHowNames: SelectTmTextValue[] = [
    ["As original URL",                                         /*0*/ "0"],
    ["Regular expression",                                      /*2*/ "2"],
];

const allHowNames: SelectTmTextValue[] = [
    ["Same as original url",                                    /*0*/ "0"],
    ["Match only domain of original url",                       /*1*/ "1"],
    ["Wildcard match",                                          /*3*/ "3"],
    ["Regular expresssion",                                     /*2*/ "2"],
    ["No domain match (Exclude this login from domain match)",  /*4*/ "4"],
];

// const inputAsRefClasses = "min-w-28 text-[0.6rem] text-blue-400! cursor-pointer";
const inputAsRefClasses = "cursor-pointer";
