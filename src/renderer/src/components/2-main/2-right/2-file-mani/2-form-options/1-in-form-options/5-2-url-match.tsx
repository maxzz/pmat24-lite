import { useState } from "react";
import { useAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { InputSelectUi } from "@/ui";
import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms/9-types";

export function MatchMurl({ oFormProps }: { oFormProps: OFormProps; }) {
    const [rfield, setRfield] = useState('org');

    function setValue(v: string) {
        setRfield(v);
    }
    
    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={inputTypes}
            value={rfield}
            onValueChange={setValue}
        />
    );
}

const inputTypes: OptionTextValue[] = [
    ["As original URL", "org"],
    ["Regular expression", "re"],
];

const inputAsRefClasses = "1w-full text-[0.6rem] !text-blue-400 cursor-pointer";
