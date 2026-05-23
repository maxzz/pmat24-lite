import { useAtom } from "jotai";
import { type FieldRowCtx } from "@/store/2-file-mani-atoms";
import { type SelectTmTextValue, SelectTm } from "@/ui/local-ui";

export function Case_ValueMatchedText({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    return (
        <div className="text-center">Matched Text</div>
    );
}
