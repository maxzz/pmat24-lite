import { SymbolInfo } from "@/ui/icons";

const sectionClasses = "\
col-span-2 \
\
mt-2 mb-1 \
pb-1 \
\
font-normal \
text-mani-title \
border-mani-title \
border-b \
flex items-center gap-1 justify-between \
";
// border-b-[length:0.2px]
// text-[#32ffdaa0] \
// border-[#32ffda40] \

export function Section({ label }: { label: string; }) {
    return (
        <div className={sectionClasses}>
            {label}
            {/* <SymbolInfo className="mr-3 size-4 text-muted-foreground 1opacity-50" /> */}
        </div>
    );
}

//TODO: show info icon on section with focus
