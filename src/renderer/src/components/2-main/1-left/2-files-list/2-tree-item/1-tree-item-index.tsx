const indexClasses = "\
pr-1.5 pb-px size-3 w-auto min-w-[18px] text-[.575rem] \
text-muted-foreground \
flex items-center justify-end \
select-none cursor-default";

export function TreeItemFileIndex({ idx }: { idx: number; }) {
    return (
        <div className={indexClasses} title="File index in the list of all loaded files">
            {idx}
        </div>
    );
}
