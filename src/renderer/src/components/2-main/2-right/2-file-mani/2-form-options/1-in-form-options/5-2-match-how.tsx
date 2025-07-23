import { useAtomValue, useSetAtom } from "jotai";
import { type Matching, type OptionTextValue } from "@/store/manifest";
import { InputSelectUi } from "@/ui";
import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms/9-types";
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
    return how !== 0 && how !== 3 ? allHowNames : shortHowNames;
}

const shortHowNames: OptionTextValue[] = [
    ["As original URL",                                         /*0*/ "0"],
    ["Regular expression",                                      /*3*/ "3"],
];

const allHowNames: OptionTextValue[] = [
    ["Same as original url",                                    /*0*/ "0"],
    ["Match only domain of original url",                       /*1*/ "1"],
    ["Wildcard match",                                          /*2*/ "2"],
    ["Regular expresssion",                                     /*3*/ "3"],
    ["No domain match (Exclude this login from domain match)",  /*4*/ "4"],
];

const inputAsRefClasses = "1w-full text-[0.6rem] !text-blue-400 cursor-pointer";
