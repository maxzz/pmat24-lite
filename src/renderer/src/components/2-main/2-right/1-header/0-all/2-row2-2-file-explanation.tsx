import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";
import { launchDataIdx, safeManiAtoms } from "@/store/2-file-mani-atoms";
import { isAnyManual } from "@/store/8-manifest";
import { SymbolOpenLink } from "@/ui/icons";
import { type LaunchData, type LaunchDataAll } from "@/store/0-serve-atoms/8-launch-data/9-launch-types";
import { asyncLaunchExe } from "@/store/0-serve-atoms/7-file-system-manipulation";
import { hasMain } from "@/xternal-to-main";

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

            <LoginLaunchOrOpenIcon all={launchData} />
            <CpassLaunchOrOpenIcon all={launchData} />
        </div>
    );
}

function LoginLaunchOrOpenIcon({ all }: { all: LaunchDataAll; }) {
    const login = all.login;
    return (<>
        {login.isWeb ? (
            <OpenUrlIcon url={login.url} anchorText={all.loginDomain} title="Open the login site" />
        ) : (
            <LaunchAppIcon launchData={all.login} />
        )}
    </>);
}

function CpassLaunchOrOpenIcon({ all }: { all: LaunchDataAll; }) {
    const cpass = all.cpass;
    return (<>
        {cpass.isWeb ? (
            <OpenUrlIcon url={cpass.url} title="Open the password change site" />
        ) : (
            <LaunchAppIcon launchData={all.cpass} />
        )}
    </>);
}

function OpenUrlIcon({ anchorText, url, title }: { anchorText?: string; url: string | undefined; title: string; }) {
    if (!url) {
        return null;
    }
    return (
        <a href={url} className={openUrlIconClasses} target="_blank" rel="noreferrer noopener" title={title}>
            {anchorText}
            <SymbolOpenLink className="pt-0.5 size-3" />
        </a>
    );
}

function LaunchAppIcon({ launchData }: { launchData: LaunchData; }) {
    if (!launchData.exe) {
        return null;
    }
    const withMain = hasMain();
    return (
        <button className={openUrlIconClasses} onClick={() => asyncLaunchExe(launchData.exe, withMain)}>
            <SymbolOpenLink className="pt-0.5 size-3" />
        </button>
    );
}

const openUrlIconClasses = "\
text-foreground \
hover:text-foreground \
hover:opacity-100 \
opacity-70 \
underline underline-offset-2 \
flex items-center gap-1";

//TODO: It is wrong to use meta data here
//TODO: why in XML view there is no open/launch menu items?
