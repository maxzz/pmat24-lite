import { useSnapshot } from "valtio";
import { appMainTitle } from "@/store";
import { useEffect } from "react";

export function AppMainTitle() {
    const { title } = useSnapshot(appMainTitle);

    useEffect(
        () => {
            document.title = title ? `PMAT - ${title}` : 'PMAT';
        }, [title]
    );

    return null;
}
