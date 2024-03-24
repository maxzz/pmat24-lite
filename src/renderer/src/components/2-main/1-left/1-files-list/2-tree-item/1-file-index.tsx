import { classNames } from "@/utils";

export function CardTitleFileIndex({ idx, errors }: { idx: number; errors?: boolean; }) {
    return (
        <div
            className={classNames(
                "p-0.5 pb-[3px] w-5 h-5 text-[.6rem] border border-dotted rounded-md flex items-center justify-center select-none cursor-default",
                errors ? "text-red-400 bg-red-900/70 border-red-500/50" : "text-primary-500 border-primary-600"
            )}
            title={errors ? undefined : "File index in the list of all loaded files"}
            onClick={(e) => errors && e.stopPropagation()}
        >
            {idx}
        </div>
    );
}
