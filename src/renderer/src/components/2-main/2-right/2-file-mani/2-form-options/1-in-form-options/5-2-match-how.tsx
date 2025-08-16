import { useAtomValue, useSetAtom } from "jotai";
import { Matching, type OptionTextValue } from "@/store/manifest";
import { InputSelectUi } from "@/ui";
import { type OFormProps } from "@/store/1-file-mani-atoms/9-types";
import { setUrlsEditorDataAtom } from "./5-9-set-atoms";

export function MatchHow({ oFormProps }: { oFormProps: OFormProps; }) {
    const { options } = oFormProps.oAllAtoms;
    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);
    const how = useAtomValue(options.howAtom);
    const items = getNamesList(how);

    function setValue(v: string) {
        setUrlsEditorData({ options, how: +v });
    }

    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={items}
            value={`${how}`}
            onValueChange={setValue}
        />
    );
}

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

const inputAsRefClasses = "1w-full text-[0.6rem] !text-blue-400 cursor-pointer";
