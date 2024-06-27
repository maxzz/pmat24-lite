import { PrimitiveAtom, useAtom } from "jotai";
import { SymbolChevronDown } from "@/ui/icons";
import { Button } from "@/ui";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { FormIdx } from "@/store/store-types";
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

function SubSlidersButton({ open, setToggle }: { open: boolean; setToggle: () => void; }) {
    return (
        <Button className="mr-0.5 col-start-2 place-self-end" onClick={setToggle}>
            <SymbolChevronDown className={classNames("size-4 text-muted-foreground", open && "rotate-180 transition-transform")} />
        </Button>
    );
}

const sectionClasses = "\
col-span-2 \
\
1first:mt-1.5 mt-1 1mb-2 1pb-1 \
\
1text-sm \
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

function toggelOpen(values: string[], value: string): string[] {
    if (values.includes(value)) {
        return values.filter(v => v !== value);
    }
    return [...values, value];
}

export function SubSectionTitle({ label, openAtom, formIdx, name }: { label: string; openAtom: PrimitiveAtom<boolean>; formIdx: FormIdx; name: string; }) {
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx].includes(name);
    const setToggle = () => appSettings.right.mani.openInOptions[formIdx] = toggelOpen(appSettings.right.mani.openInOptions[formIdx], name);
    return (
        <div className={sectionClasses}>
            {label}
            <div className="flex-1 mx-2 h-0.5 bg-muted-foreground opacity-15 dark:opacity-25"></div>

            <SubSlidersButton open={open} setToggle={setToggle} />
        </div>
    );
}
