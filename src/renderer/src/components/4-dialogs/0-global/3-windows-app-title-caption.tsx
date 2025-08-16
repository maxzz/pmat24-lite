import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { appMainTitle } from "@/store/9-ui-state";

export function WindowsAppTitleCaption() {
    const { title } = useSnapshot(appMainTitle);

    useEffect(
        () => {
            document.title = title ? `PMAT - ${title}` : 'PMAT';
        }, [title]
    );

    return null;
}
