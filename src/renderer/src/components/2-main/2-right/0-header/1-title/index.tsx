import { useAtomValue } from "jotai";
import { FileUs } from "@/store/store-types";
import { rightPanelSelectedContentAtom } from "@/store";

function TitleWitFileUs({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="py-1 text-muted-foreground space-y-1">
            <div className="">Name {fileUs.fname}</div>
            <div className="">Title {fileUs.stats.title}</div>
        </div>
    );
}

export function RightTitle() {
    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    return (<>
        {!fileUs
            ? (
                <div className="h-full select-none flex items-center">No File</div>
            )
            : (
                <TitleWitFileUs fileUs={fileUs} />
            )
        }
    </>);
}
