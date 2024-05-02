import { FileUs } from "@/store/store-types";
import { isManual } from "@/store/store-utils";

const ManiUrlPartsClasses = "\
1text-foreground \
hover:text-foreground \
underline \
underline-offset-2 \
1underline-offset-auto \
1text-sm \
1font-semibold \
";

function ManiUrlParts({ url, domain }: { url: string | undefined; domain: string; }) {
    return (<>
        Login is defined for the site

        <div className={ManiUrlPartsClasses}>
            {domain}
        </div>
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
