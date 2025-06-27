import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { FirstRow } from "./1-col-field-type";
import { SecondRow } from "./2-second-row";

export function PropsEditorFld({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    return (<>
        <FirstRow item={item} fileUsCtx={fileUsCtx} />
        <SecondRow item={item} fileUsCtx={fileUsCtx} />
    </>);
}
