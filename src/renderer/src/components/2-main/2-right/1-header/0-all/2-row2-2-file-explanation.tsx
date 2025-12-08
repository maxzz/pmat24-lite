import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";
import { launchDataIdx, safeManiAtoms } from "@/store/2-file-mani-atoms";
import { isAnyManual } from "@/store/8-manifest";
import { SymbolOpenLink } from "@/ui/icons";

export function Row2_Explanation({ fileUs }: { fileUs: FileUs; }) {
    const maniAtoms = safeManiAtoms(useAtomValue(fileUs.maniAtomsAtom));
    const launchData = useAtomValue(maniAtoms[launchDataIdx]);

    const { stats: { loginFormDomain }, meta } = fileUs.parsedSrc;

    const loginUrl = launchData.login.url;
    const cpassUrl = launchData.cpass.url;
    const showCpassUrl = cpassUrl && cpassUrl !== loginUrl;

    const loginDomain = launchData.loginDomain;

    const prefix = launchData.login.isWeb ? 'The login is defined for' : isAnyManual(meta) ? 'Manually defined login for a Windows application' : 'Login for a Windows application';

    if (launchData.login.isWeb) {
    } else {
    }

    if (launchData.cpass.isWeb) {
    } else {

    }

    // const loginUrl = meta?.[0]?.mani?.detection?.web_ourl || domainName; // open domain in browser if url is not defined
    // const cpassUrl = meta?.[1]?.mani?.detection?.web_ourl;
    // const showCpassUrl = cpassUrl && cpassUrl !== loginUrl;

    return (
        <div className="min-w-0 flex items-center gap-1">
            <span className="truncate">
                {prefix}
            </span>

            {loginUrl && (
                <DomainAndOpenIcon domain={loginFormDomain} url={loginUrl} title="Open the login site" />
            )}

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

const DomainAndOpenIconClasses = "\
text-foreground \
hover:text-foreground \
hover:opacity-100 \
opacity-70 \
underline underline-offset-2 \
flex items-center gap-1";

//TODO: It is wrong to use meta data here
//TODO: why in XML view there is no open/launch menu items?
