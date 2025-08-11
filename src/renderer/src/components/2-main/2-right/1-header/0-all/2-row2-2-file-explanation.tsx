import { FileUs } from "@/store/store-types";
import { isAnyManual } from "@/store/manifest";
import { SymbolOpenLink } from "@/ui/icons";

export function Row2_Explanation({ fileUs }: { fileUs: FileUs; }) {
    const { stats: { loginFormDomain: domain }, meta } = fileUs.parsedSrc;

    if (!domain) {
        const title =
            isAnyManual(meta)
                ? 'Manually defined login for a Windows application'
                : 'Login for a Windows application';
        return (
            <span className="1shrink 1min-w-0 truncate">
                {title}
            </span>
        );
    }

    const loginUrl = meta?.[0]?.mani?.detection?.web_ourl || domain; // open domain in browser if url is not defined
    const cpassUrl = meta?.[1]?.mani?.detection?.web_ourl;
    const showCpass = cpassUrl && cpassUrl !== loginUrl;

    return (
        <div className="flex items-center">
            <ManiUrlParts url={loginUrl} domain={domain} />

            {showCpass && (
                <DomainAndOpenIcon url={cpassUrl} title="Open the password change site" />
            )}
        </div>
    );
}

function ManiUrlParts({ url, domain }: { url: string | undefined; domain: string; }) {
    return (
        <div className="flex items-center gap-1">
            The login is defined for {' '}

            {url
                ? (
                    <DomainAndOpenIcon domain={domain} url={url} title="Open the login site" />
                )
                : (
                    <div className={ManiUrlPartsClasses}>
                        {domain}
                    </div>
                )
            }
        </div>
    );
}

function DomainAndOpenIcon({ domain, url, title }: { domain?: string; url: string | undefined; title: string; }) {
    return (
        <a href={url} className={DomainAndOpenIconClasses} target="_blank" rel="noreferrer noopener" title={title}>
            {domain}
            <SymbolOpenLink className="pt-0.5 size-3" />
        </a>
    );
}

const ManiUrlPartsClasses = "\
text-foreground \
opacity-70 \
hover:opacity-100 \
hover:text-foreground \
underline \
underline-offset-2";

const DomainAndOpenIconClasses = "\
text-foreground \
hover:text-foreground \
hover:opacity-100 \
opacity-70 \
underline underline-offset-2 \
flex items-center gap-1";
