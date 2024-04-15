import { useAtomValue } from "jotai";
import { rightPanelSelectedContentAtom } from "@/store";
import { TitleWithFileUs } from "./2-with-file-us";
import { TitleNoFile } from "./1-no-file";

export function RightTitle() {
    const fileUs = useAtomValue(rightPanelSelectedContentAtom);

    if (!fileUs) {
        return <TitleNoFile />;
    } else {
        return <TitleWithFileUs fileUs={fileUs} />;
    }
}
