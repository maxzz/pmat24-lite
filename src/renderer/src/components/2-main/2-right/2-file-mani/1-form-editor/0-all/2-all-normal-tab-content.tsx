import { type NFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";

export function NormalFormTabContent({ ctx }: { ctx: NFormContextProps; }) {
    const hasFields = !!ctx.nAllAtoms.normal.rowCtxs.length;
    return (
        <div className="mr-0.5 h-full flex flex-col">

            <div className={labelClasses}>
                Form fields
            </div>
            <FieldsGrid ctx={ctx} />

            {hasFields && (
                <>
                    <div className={labelClasses}>
                        Form submit options
                    </div>
                    <TabSubmit ctx={ctx} />
                </>
            )}
        </div>
    );
}

const labelClasses = "ml-2 mt-1 -mb-1 text-xs font-semibold select-none";
