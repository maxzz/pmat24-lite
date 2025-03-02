import { appSettings, type FileUs, RightPanelViewType } from "@/store";
import { ButtonQuickXml } from "../3-btn-quick-xml";
import { Button_AddItem, Button_DeleteItem, Button_Filter } from "../2-fc-tools";

export function ToolbarSelector({ fileUs }: { fileUs: FileUs; }) {
    if (appSettings.right.activeView === RightPanelViewType.xml) {
        return <ToolbarContentForXml fileUs={fileUs} />;
    }

    if (fileUs.parsedSrc.stats.isFCat) {
        return <ToolbarContentForFc fileUs={fileUs} />;
    } else {
        return <ToolbarContentForManifest fileUs={fileUs} />;
    }
}

function ToolbarContentForXml({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="flex items-center gap-1">
            <ButtonQuickXml />
        </div>
    );
}

function ToolbarContentForManifest({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="flex items-center gap-1">
            {/* <Button_AddItem fceCtx={fileUs.fceAtoms?.viewFceCtx} />
            <Button_DeleteItem fceCtx={fileUs.fceAtoms?.viewFceCtx} /> */}
            <ButtonQuickXml />
        </div>
    );
}
function ToolbarContentForFc({ fileUs }: { fileUs: FileUs; }) {
    const fceCtx = fileUs.fceAtomsForFcFile?.viewFceCtx;
    if (!fceCtx) {
        return null;
    }
    return (<>
        <Button_Filter fceCtx={fceCtx} />
        {/* //TODO: buttons add, delete, filter, sort */}
        
        <Button_AddItem fceCtx={fceCtx} />
        <Button_DeleteItem fceCtx={fceCtx} />

        <ButtonQuickXml />
        {/* //TODO: dissable <ButtonQuickXml /> if FC file is not saved */}
    </>);
    //TODO: add room for filter
}
