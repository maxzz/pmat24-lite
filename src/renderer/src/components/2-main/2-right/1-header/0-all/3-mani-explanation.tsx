import { FileUs } from "@/store/store-types";
import { isManual } from "pm-manifest";
import { SymbolOpenLink } from "@/ui/icons";

const ManiUrlPartsClasses = "\
text-foreground \
hover:text-foreground \
hover:opacity-100 \
opacity-70 \
underline underline-offset-2 \
flex items-center gap-1 \
";

const ManiNoUrlPartsClasses = "\
text-foreground \
opacity-70 \
hover:opacity-100 \
hover:text-foreground \
underline \
underline-offset-2 \
";

function FollowUrl({ url, domain, title }: { url: string | undefined; domain?: string; title: string; }) {
    return (
        <a href={url} className={ManiUrlPartsClasses} target="_blank" rel="noreferrer noopener" title={title}>
            {domain}
            <SymbolOpenLink className="pt-0.5 size-3" />
        </a>
    );
}

function ManiUrlParts({ url, domain }: { url: string | undefined; domain: string; }) {
    return (
        <div className="flex items-center gap-1">
            The login is defined for {' '}

            {url
                ? (
                    <FollowUrl url={url} domain={domain} title="Open login website" />
                )
                : (
                    <div className={ManiNoUrlPartsClasses}>
                        {domain}
                    </div>
                )
            }
        </div>
    );
}

export function ManiExplanation({ fileUs }: { fileUs: FileUs; }) {

    if (!fileUs.stats.domain) {
        const manual = isManual(fileUs.meta);
        return manual
            ? 'Manually defined login for a Windows application'
            : 'Login for a Windows application';
    }

    const domain = fileUs.stats.domain;
    const loginUrl = fileUs.stats.url || domain; // open domain in browser if url is not defined
    const cpassUrl = fileUs.meta?.[1]?.mani?.detection?.web_ourl;
    const showCpass = cpassUrl && cpassUrl !== loginUrl;

    return (
        <div className="flex items-center">
            <ManiUrlParts url={loginUrl} domain={domain} />

            {showCpass && (
                <FollowUrl url={cpassUrl} title="Open password change website" />
            )}
        </div>
    );
}
