import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";

export function NormalFormTabContent({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        <div className="mr-0.5 h-full flex flex-col">

            <div className="ml-2 mt-1 -mb-1 text-xs font-semibold select-none">Form fields</div>
            <FieldsGrid ctx={ctx} />

            <div className="ml-2 mt-1 -mb-1 text-xs font-semibold select-none">Form submit options</div>
            <TabSubmit ctx={ctx} />
        </div>
    </>);
}
