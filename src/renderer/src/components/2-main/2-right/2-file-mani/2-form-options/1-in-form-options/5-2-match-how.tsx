import { useState } from "react";
import { useAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
// import { InputSelectUi } from "@/ui";
import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { InputSelectUi } from "./4-input-select-ui";

export function MatchHow({ oFormProps }: { oFormProps: OFormProps; }) {
    const [rfield, setRfield] = useState('0');

    const isFullNames = false; //TODO: select by ctrl+click or by values from manifest
    const items = isFullNames ? allHowNames : shortHowNames;

    function setValue(v: string) {
        setRfield(v);
    }

    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={items}
            value={rfield}
            onValueChange={setValue}
        />
    );
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
