import { FileUs, FormIdx } from "@/store/store-types";
import { ManiSection3_Policy } from "./0-all";

export function TabPolicy({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    return (
        <div className="ml-4">
            <ManiSection3_Policy fileUs={fileUs} formIdx={formIdx} />
        </div>
    );
}
