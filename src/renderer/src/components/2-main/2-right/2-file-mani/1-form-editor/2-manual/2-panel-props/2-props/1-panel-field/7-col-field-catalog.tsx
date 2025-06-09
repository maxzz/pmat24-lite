import { useSnapshot } from "valtio";
import { type FceItem, appSettings } from "@/store";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column5_Catalog } from "../../../../1-normal/1-fields";
import { InputLabel } from "../8-props-ui/1-input-label";

export function Col_FiledCatalog({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    return (<>
        {fcAllowed && (
            <InputLabel label="Catalog">
                <Column5_Catalog
                    rowCtx={item.rowCtx}
                    fileUsCtx={fileUsCtx}
                    onSelectCatItem={function onSelectCatItem(item: FceItem | undefined) {/*TODO:*/}}
                />
            </InputLabel>
        )}
    </>);
}
