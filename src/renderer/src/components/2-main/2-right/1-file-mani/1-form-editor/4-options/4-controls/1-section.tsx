const SectionClassed = "\
col-span-2 \
\
mt-2 mb-1 \
\
font-normal \
text-[#32ffdaa0] \
border-[#32ffda40] \
border-b";

export function Section({ label }: { label: string; }) {
    return (
        <div className={SectionClassed}>
            {label}
        </div>
    );
}
