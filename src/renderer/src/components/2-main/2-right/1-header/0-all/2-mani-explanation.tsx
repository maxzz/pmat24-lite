import { FileUs } from "@/store/store-types";
import { isManual } from "@/store/store-utils";

const ManiUrlPartsClasses = "\
text-foreground \
opacity-70 \
hover:opacity-100 \
hover:text-foreground \
underline \
underline-offset-2 \
";

const ManiNoUrlPartsClasses = "\
text-foreground \
opacity-70 \
hover:opacity-100 \
hover:text-foreground \
underline \
underline-offset-2 \
";

function ManiUrlParts({ url, domain }: { url: string | undefined; domain: string; }) {
    return (<>
        Login is defined for the site

        {url
            ? (
                <a href={url} className={ManiUrlPartsClasses} target="_blank" rel="noreferrer noopener">
                    {domain}
                </a>
            )
            : (
                <div className={ManiNoUrlPartsClasses}>
                    {domain}
                </div>
            )
        }
    </>);
}

export function ManiExplanation({ fileUs }: { fileUs: FileUs; }) {

    if (!fileUs.stats.domain) {
        const manual = isManual(fileUs);
        return manual
            ? 'Manually defined login for a Windows application'
            : 'Login for a Windows application';
    }

    return (
        <ManiUrlParts url={fileUs.stats.url} domain={fileUs.stats.domain} />
    );
}
