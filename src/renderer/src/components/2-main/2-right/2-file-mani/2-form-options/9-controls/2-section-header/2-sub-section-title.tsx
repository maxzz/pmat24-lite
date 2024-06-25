import { useState } from "react";
import { PrimitiveAtom, atom, useAtomValue } from "jotai";
import { SymbolInfo } from "@/ui/icons";
import { SlidersButton } from "../3-sliders-button";

const sectionClasses0 = "\
col-span-2 \
\
first:mt-1.5 mt-2 mb-0.5 pb-1 \
\
font-normal \
text-mani-title \
border-mani-title \
border-b";
// border-b-[length:0.2px]
// text-[#32ffdaa0] \
// border-[#32ffda40] \

export function SubSectionTitle0({ label }: { label: string; }) {
    return (
        <div className={sectionClasses0}>
            {label}
            {/* <SymbolInfo className="mr-3 size-4 text-muted-foreground 1opacity-50" /> */}
        </div>
    );
}

//TODO: show info icon on section with focus

const sectionClasses = "\
col-span-2 \
\
first:mt-1.5 mt-2 mb-0.5 pb-1 \
\
font-normal \
text-mani-title \
border-mani-title \
border-b \
flex items-end justify-between\
\
\
";

export function SubSectionTitle({ label, openAtom }: { label: string; openAtom: PrimitiveAtom<boolean>; }) {
    return (
        <div className={sectionClasses}>
            {label}
            <SlidersButton openAtom={openAtom} />
        </div>
    );
}
