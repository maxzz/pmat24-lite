import { FileUs } from "@/store/store-types";
import { isAnyManual } from "@/store/8-manifest";
import { SymbolOpenLink } from "@/ui/icons";

export function Row2_Explanation({ fileUs }: { fileUs: FileUs; }) {
    const { stats: { loginFormDomain: domain }, meta } = fileUs.parsedSrc;

    if (!domain) {
        const title =
            isAnyManual(meta)
                ? 'Manually defined login for a Windows application'
                : 'Login for a Windows application';
        return (
            <span className="truncate">
                {title}
            </span>
        );
    }

    const loginUrl = meta?.[0]?.mani?.detection?.web_ourl || domain; // open domain in browser if url is not defined
    const cpassUrl = meta?.[1]?.mani?.detection?.web_ourl;
    const showCpassUrl = cpassUrl && cpassUrl !== loginUrl;

    return (
        <div className="min-w-0 flex items-center gap-1">
            <span className="truncate">
                The login is defined for
            </span>

            {loginUrl
                ? (
                    <DomainAndOpenIcon domain={domain} url={loginUrl} title="Open the login site" />
                )
                : (
                    <div className={ManiUrlPartsClasses}>
                        {domain}
                    </div>
                )
            }

            {showCpassUrl && (
                <DomainAndOpenIcon url={cpassUrl} title="Open the password change site" />
            )}
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
