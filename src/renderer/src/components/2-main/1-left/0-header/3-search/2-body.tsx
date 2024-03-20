import * as D from "@/ui/shadcn/dialog";
import { Input, Label } from "@/ui/shadcn";

export function DialogFilterBody() {
    return (<>
        <div className="text-xs grid gap-4">

            <Input className="" value="" onChange={() => { }} placeholder="Search manifest" />

            <div className="">Manifest list</div>

        </div>
    </>);
}
