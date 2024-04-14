const SectionClasses = "\
col-span-2 \
\
mt-2 mb-1 \
\
font-normal \
text-mani-title \
border-mani-title \
border-b \
";
// border-b-[length:0.2px]
// text-[#32ffdaa0] \
// border-[#32ffda40] \

export function Section({ label }: { label: string; }) {
    return (
        <div className={SectionClasses}>
            {label}
        </div>
    );
}
