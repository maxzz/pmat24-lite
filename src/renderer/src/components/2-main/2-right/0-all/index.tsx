import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { RightPanelView, appSettings, rightPanelContentAtom } from "@/store";
import { panel1Classes, panel2Classes, panel3Classes } from "../../3-middle/shared-classes";
import { R_PanelHeader } from "../1-header";
import { ManiBody } from "../2-file-mani";
import { Body_Xml } from "../3-file-xml";

function ContentForSelected() {
    const fileUs = useAtomValue(rightPanelContentAtom);
    const { view } = useSnapshot(appSettings).rightPanel.rightPanelState;

    const staticText = !fileUs ? 'No file selected' : !fileUs.raw ? 'Not supported format' : undefined;
    if (staticText) {
        return (
            <div className="h-full text-muted-foreground flex items-center justify-center">
                {staticText}
            </div>
        );
    }

    return (<>
        {view === RightPanelView.forms
            ? (
                <ManiBody />
            ) : (
                <Body_Xml text={fileUs?.raw || ''} />
            )
        }
    </>);
}

export function PanelB() {
    return (
        <div className={`${panel1Classes} pl-0`}>
            <div className={`${panel2Classes} rounded-r`}>
                <div className={panel3Classes}>
                    <R_PanelHeader />

                    <div className="relative w-full h-full" tabIndex={0}>
                        <div className="absolute inset-px bottom-0.5 text-xs">
                            {/* <LongPanel className="w-full h-20 overflow-auto" /> */}
                            <ContentForSelected />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
