export function TreeItemFileIndex({ idx }: { idx: number; }) {
    return (
        <div
            className="pr-1 pb-0.5 size-3 w-auto min-w-3 text-[.575rem] text-muted-foreground flex items-center justify-center select-none cursor-default"
            title="File index in the list of all loaded files"
        >
            {idx}
        </div>
    );
}
