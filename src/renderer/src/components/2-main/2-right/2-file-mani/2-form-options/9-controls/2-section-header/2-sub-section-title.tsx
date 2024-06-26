import { PrimitiveAtom, useSetAtom } from "jotai";
import { IconSliders, SymbolChevronDown } from "@/ui/icons";
import { Button } from "@/ui";
// import { SlidersButton } from "../3-sliders-button";

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
1first:mt-1.5 mt-2 mb-2 1pb-1 \
\
font-normal \
text-mani-title \
bg-muted \
1border-mani-title \
border-border \
1border-t \
border-b \
flex items-center justify-between\
\
\
";

function SlidersButton({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const setOpen = useSetAtom(openAtom);
    return (
        <Button className="mr-0.5 col-start-2 place-self-end" onClick={() => setOpen(v => !v)}>
            <SymbolChevronDown className="size-4 text-muted-foreground" />
        </Button>
    );
}

export function SubSectionTitle({ label, openAtom }: { label: string; openAtom: PrimitiveAtom<boolean>; }) {
    return (
        <div className={sectionClasses}>
            {label}
            <SlidersButton openAtom={openAtom} />
        </div>
    );
}
