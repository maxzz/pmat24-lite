import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";

export function NormalFormTabContent({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        <div className="mr-1 h-full flex flex-col">

            Form fields
            <FieldsGrid ctx={ctx} />

            Form submit options
            <TabSubmit ctx={ctx} />
        </div>
    </>);
}
