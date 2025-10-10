import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, RightPanelViewAs } from "@/store/9-ui-state";
import { type FileUs } from "@/store/store-types";
import { fileUsOfRightPanelAtom } from "@/store/5-3-right-panel";
import { panel1Classes, panel2Classes, panel3Classes } from "../../0-all/1-working-area/3-shared-classes";
import { R_PanelHeaderBody } from "../1-header";
import { ManiBody } from "../2-file-mani";
import { Body_Cat } from "../3-file-cat";
import { Body_Xml } from "../4-file-xml";

export function PanelB() { // PanelB is the right panel for the file content
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <R_PanelHeaderBody />

                    <div className="relative w-full h-full"> {/* tabIndex={0} should be set on element inside container */}
                        <div className="absolute inset-px bottom-0.5 text-xs">
                            {/* <LongPanel className="w-full h-20 overflow-auto" /> */}
                            <ContentSelector />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContentSelector() {
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    const { activeView } = useSnapshot(appSettings).right;

    const staticText =
        !fileUs
            ? 'No file selected'
            : fileUs.parsedSrc.stats.isFCatRoot // it can be just created file
                ? undefined
                : !fileUs.fileCnt.rawLoaded
                    ? 'Not supported format'
                    : undefined;

    if (staticText) {
        return (
            <div className="h-full text-muted-foreground flex items-center justify-center select-none">
                {staticText}
            </div>
        );
    }

    if (activeView === RightPanelViewAs.xml) {
        return (
            fileUs
                ? <BodyXmlGuarded fileUs={fileUs} />
                : <Body_Xml text="" />
        );
    }

    return (
        fileUs?.parsedSrc.stats.isFCat
            ? <Body_Cat />
            : <ManiBody />
    );
}

function BodyXmlGuarded({ fileUs }: { fileUs: FileUs; }) {
    const rawCpass = useAtomValue(fileUs.rawCpassAtom);
    return <Body_Xml text={rawCpass || fileUs?.fileCnt.rawLoaded || ''} />;
}
