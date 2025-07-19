import { useState } from "react";
import { useAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { InputSelectUi } from "@/ui";

export function MatchMurl() {
    const [rfield, setRfield] = useState('org');
    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={inputTypes}
            value={rfield}
            onValueChange={setRfield}
        />
    );
}

const inputTypes: OptionTextValue[] = [
    ["As original URL", "org"],
    ["Regular expression", "re"],
];

const inputAsRefClasses = "1w-full text-[0.6rem] !text-blue-400 cursor-pointer";
