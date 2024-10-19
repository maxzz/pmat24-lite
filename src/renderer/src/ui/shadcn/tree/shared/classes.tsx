// tree folder

export const folderBaseClasses = "\
px-2 py-1 \
before:absolute \
before:left-0 \
before:w-full \
before:h-[1.75rem] \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
";

export const folderSelectedClasses = "\
text-accent-foreground \
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";

export const folderIconClasses = "shrink-0 mr-2 size-4 text-accent-foreground/50";

// tree leaf

export const leafBaseClasses = "\
px-2 py-1 relative \
\
before:absolute \
before:left-0 \
before:right-1 \
before:w-full \
before:h-full \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
\
cursor-pointer \
flex items-center \
";

export const leafSelectedClasses = "\
text-accent-foreground \
\
before:data-[tree-item-selected]:1border \
\
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";

export const leafIconClasses = "shrink-0 mr-2 size-4 text-accent-foreground/50";
