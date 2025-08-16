import { type FileUsCtx, type ManualFieldState } from "@/store/1-file-mani-atoms";
import { FirstRow } from "./1-row-1";
import { SecondRow } from "./2-row-2";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    return (<>
        <FirstRow item={item} fileUsCtx={fileUsCtx} />
        <SecondRow item={item} fileUsCtx={fileUsCtx} />
    </>);
}
