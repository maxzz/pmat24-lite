import { appSettings, type FileUs, type FileUsAtom, RightPanelViewType } from "@/store";
import { ButtonQuickXml } from "../3-btn-quick-xml";

export function ToolbarContent({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {

    if (appSettings.right.activeView === RightPanelViewType.xml) {
        return <ToolbarForXml fileUs={fileUs} fileUsAtom={fileUsAtom} />;
    }

    if (fileUs.parsedSrc.stats.isFCat) {
        return <ToolbarForFc fileUs={fileUs} fileUsAtom={fileUsAtom} />;
    }

    return (<ToolbarForManifest fileUs={fileUs} fileUsAtom={fileUsAtom} />);
}

function ToolbarForXml({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {
    return (
        <div className="flex items-center gap-1">
            <ButtonQuickXml />
        </div>
    );
}

function ToolbarForManifest({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {
    return (
        <div className="flex items-center gap-1">
            {/* <Button_AddItem fceCtx={fileUs.fceAtoms?.viewFceCtx} />
            <Button_DeleteItem fceCtx={fileUs.fceAtoms?.viewFceCtx} /> */}
            <ButtonQuickXml />
        </div>
    );
}
function ToolbarForFc({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }) {
    const fceCtx = fileUs.fceAtoms?.viewFceCtx;
    if (!fceCtx) {
        return null;
    }
    return (
        <div className="flex items-center gap-1">
            {/* <Button_AddItem fceCtx={fceCtx} />
            <Button_DeleteItem fceCtx={fceCtx} /> */}
            <ButtonQuickXml />
        </div>
    );
}

