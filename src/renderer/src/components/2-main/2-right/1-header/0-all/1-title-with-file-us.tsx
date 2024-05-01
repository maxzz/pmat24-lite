import { FileUs } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType } from "@/store/store-utils";

function TitleFinename({ fileUs }: { fileUs: FileUs; }) {
    const name = fileUs.fname;
    return (
        <div className="" title="Filename">{name}</div>
    );
}

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {

    const { icon, hasBailOut } = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(icon, hasBailOut);

    return (
        <div className="py-1 text-muted-foreground space-y-1 cursor-default">

            <div className="flex items-center gap-1">
                <Icon className="size-5" />

                {!fileUs.stats.domain
                    ? 'Windows application'
                    : (
                        <>
                            Website: <div className="1text-foreground text-sm 1font-semibold">{fileUs.stats.domain}</div>
                        </>
                    )
                }
            </div>

            <div className="" title="Title from file">{fileUs.stats.title}</div>

            <TitleFinename fileUs={fileUs} />
        </div>
    );
}
