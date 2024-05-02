import { FileUs } from "@/store/store-types";
import { isManual } from "@/store/store-utils";

function ManiUrlParts({ url, domain }: { url: string | undefined; domain: string; }) {
    return (<>
        Login is defined for the site

        <div className="1text-foreground hover:text-foreground underline underline-offset-2 1underline-offset-auto 1text-sm 1font-semibold">
            {domain}
        </div>
    </>);
}

export function ManiExplanation({ fileUs }: { fileUs: FileUs; }) {
    const manual = isManual(fileUs);
    return (<>
        {!fileUs.stats.domain
            ? manual
                ? 'Manually defined login for a Windows application'
                : 'Login for a Windows application'
            : <ManiUrlParts url={fileUs.stats.url} domain={fileUs.stats.domain} />}
    </>);
}
