import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";
import { launchDataIdx, safeManiAtoms } from "@/store/2-file-mani-atoms";
import { isAnyManual } from "@/store/8-manifest";
import { SymbolOpenLink } from "@/ui/icons";
import { LaunchDataAll } from "@/store/0-serve-atoms/8-launch-data/9-launch-types";

export function Row2_Explanation({ fileUs }: { fileUs: FileUs; }) {
    const maniAtoms = safeManiAtoms(useAtomValue(fileUs.maniAtomsAtom));
    const launchData = useAtomValue(maniAtoms[launchDataIdx]);

    const { meta } = fileUs.parsedSrc;
    const prefix = launchData.login.isWeb ? 'The login is defined for' : isAnyManual(meta) ? 'Manually defined login for a Windows application' : 'Login for a Windows application';

    // const loginUrl = meta?.[0]?.mani?.detection?.web_ourl || domainName; // open domain in browser if url is not defined
    // const cpassUrl = meta?.[1]?.mani?.detection?.web_ourl;
    // const showCpassUrl = cpassUrl && cpassUrl !== loginUrl;

    return (
        <div className="min-w-0 flex items-center gap-1">
            <span className="truncate">
                {prefix}
            </span>

            <LaunchOrOpenIcons launchData={launchData} />
        </div>
    );
}

function LaunchOrOpenIcons({ launchData }: { launchData: LaunchDataAll; }) {
    const loginUrl = launchData.login.url;
    const cpassUrl = launchData.cpass.url;

    const loginDomain = launchData.loginDomain;

    if (launchData.login.isWeb) {
    } else {
    }

    if (launchData.cpass.isWeb) {
    } else {

    }

    return (<>
        <DomainAndOpenIcon url={loginUrl} anchorText={loginDomain} title="Open the login site" />

        <DomainAndOpenIcon url={cpassUrl} title="Open the password change site" />
    </>);
}

function DomainAndOpenIcon({ anchorText, url, title }: { anchorText?: string; url: string | undefined; title: string; }) {
    if (!url) {
        return null;
    }
    return (
        <a href={url} className={DomainAndOpenIconClasses} target="_blank" rel="noreferrer noopener" title={title}>
            {anchorText}
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
