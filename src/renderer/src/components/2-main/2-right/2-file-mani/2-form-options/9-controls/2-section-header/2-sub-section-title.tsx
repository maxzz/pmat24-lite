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

function SubSlidersButton({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const setOpen = useSetAtom(openAtom);
    return (
        <Button className="mr-0.5 col-start-2 place-self-end" onClick={() => setOpen(v => !v)}>
            <SymbolChevronDown className="size-4 text-muted-foreground" />
        </Button>
    );
}

const sectionClasses = "\
col-span-2 \
\
1first:mt-1.5 mt-1 1mb-2 1pb-1 \
\
text-sm \
font-normal \
1text-mani-title \
1bg-muted \
1border-mani-title \
border-border \
1border-t \
1border-b \
flex items-center justify-between \
\
\
";

export function SubSectionTitle({ label, openAtom }: { label: string; openAtom: PrimitiveAtom<boolean>; }) {
    return (
        <div className={sectionClasses}>
            {label}
            <div className="flex-1 mx-2 h-0.5 bg-muted-foreground opacity-15 dark:opacity-25"></div>
            <SubSlidersButton openAtom={openAtom} />
        </div>
    );
}
