import { FileUs } from "@/store/store-types";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="py-1 text-muted-foreground space-y-1">
            <div className="">Name {fileUs.fname}</div>
            <div className="">Title {fileUs.stats.title}</div>
        </div>
    );
}
