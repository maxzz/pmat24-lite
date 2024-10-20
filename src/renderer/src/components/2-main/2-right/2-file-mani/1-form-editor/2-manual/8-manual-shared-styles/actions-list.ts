export const rowParentActiveClasses = "[--parent-active:0] focus-within:[--parent-active:1]";

export const rowClasses = "\
leading-6 \
hover:bg-primary-200/30 dark:hover:bg-primary-800/40";

export const rowSelectedClasses = "\
text-primary-800 dark:text-primary-200 \
\
bg-primary-400/20 dark:bg-primary-400/20 \
hover:!bg-primary-400/30 \
\
outline-primary-400 \
[outline-width:calc(var(--parent-active)_*_1px)] \
outline rounded-[3px] \
\
cursor-default";
