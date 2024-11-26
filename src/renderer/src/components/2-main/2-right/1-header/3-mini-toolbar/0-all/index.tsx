import { appSettings, type FileUs, RightPanelViewType } from "@/store";
import { ButtonQuickXml } from "../3-btn-quick-xml";
import { Button_AddItem, Button_DeleteItem, Button_Filter } from "../2-fc-tools";

export function ToolbarContent({ fileUs }: { fileUs: FileUs; }) {

    if (appSettings.right.activeView === RightPanelViewType.xml) {
        return <ToolbarForXml fileUs={fileUs} />;
    }

    if (fileUs.parsedSrc.stats.isFCat) {
        return <ToolbarForFc fileUs={fileUs} />;
    }

    return (<ToolbarForManifest fileUs={fileUs} />);
}

function ToolbarForXml({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="flex items-center gap-1">
            <ButtonQuickXml />
        </div>
    );
}

function ToolbarForManifest({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="flex items-center gap-1">
            {/* <Button_AddItem fceCtx={fileUs.fceAtoms?.viewFceCtx} />
            <Button_DeleteItem fceCtx={fileUs.fceAtoms?.viewFceCtx} /> */}
            <ButtonQuickXml />
        </div>
    );
}
function ToolbarForFc({ fileUs }: { fileUs: FileUs; }) {
    const fceCtx = fileUs.fceAtoms?.viewFceCtx;
    if (!fceCtx) {
        return null;
    }
    return (<>
        {/* <Button_Filter fceCtx={fceCtx} /> */}
        <Button_AddItem fceCtx={fceCtx} />
        <Button_DeleteItem fceCtx={fceCtx} />
        {/* //TODO: buttons add, delete, filter, sort */}
        <ButtonQuickXml /> {/* //TODO: dissable <ButtonQuickXml /> if FC file is not saved */}
    </>);
    //TODO: add room for filter
}
