import { FileUs } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType, isManual } from "@/store/store-utils";
import { ManiFilenameParts } from "./2-filename-parts";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {

    const { icon, hasBailOut } = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(icon, hasBailOut);

    const manual = isManual(fileUs);

    return (
        <div className="py-1 text-muted-foreground space-y-1 cursor-default">

            <div className="pl-1 1text-foreground text-sm font-semibold" title="Title from file">{fileUs.stats.title}</div>

            <div className="flex items-center gap-1">
                <Icon className="size-4" />

                {!fileUs.stats.domain
                    ? manual
                        ? 'Manually defined login for a Windows application'
                        : 'Login for a Windows application'
                    : <ManiUrlParts url={fileUs.stats.url} domain={fileUs.stats.domain} />
                }
            </div>

            <ManiFilenameParts fname={fileUs.fname} />
        </div>
    );
}

function ManiUrlParts({ url, domain }: { url: string | undefined; domain: string; }) {
    return (<>
        Login is defined for the site

        <div className="1text-foreground hover:text-foreground underline underline-offset-2 1underline-offset-auto 1text-sm 1font-semibold">
            {domain}
        </div>
    </>);
}
