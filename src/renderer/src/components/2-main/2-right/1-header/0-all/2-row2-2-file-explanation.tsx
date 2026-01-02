import { useAtomValue } from "jotai";
import { hasMain } from "@/xternal-to-main";
import { isAnyManual } from "@/store/8-manifest";
import { type FileUs } from "@/store/store-types";
import { type LaunchData } from "@/store/0-serve-atoms/8-launch-data/9-launch-types";
import { launchDataIdx, safeManiAtoms } from "@/store/2-file-mani-atoms";
import { asyncLaunchExe, labelLaunchLoginApp, labelLaunchPasswordChangeApp, labelOpenLoginScreen, labelOpenPasswordChangeScreen } from "@/store/0-serve-atoms/7-file-system-manipulation";
import { SymbolOpenLink, SymbolOpenLinkRun } from "@/ui/icons";
import { classNames } from "@/utils";

export function Row2_Explanation({ fileUs }: { fileUs: FileUs; }) {
    const maniAtoms = safeManiAtoms(useAtomValue(fileUs.maniAtomsAtom));
    const all = useAtomValue(maniAtoms[launchDataIdx]);

    const { meta } = fileUs.parsedSrc;
    const prefix = all.login.isWeb ? 'The login is defined for' : isAnyManual(meta) ? 'Manually defined login for a Windows application' : 'Login for a Windows application';

    // const loginUrl = meta?.[0]?.mani?.detection?.web_ourl || domainName; // open domain in browser if url is not defined
    // const cpassUrl = meta?.[1]?.mani?.detection?.web_ourl;
    // const showCpassUrl = cpassUrl && cpassUrl !== loginUrl;

    const login = all.login;
    const cpass = all.cpass;

    return (
        <div className="min-w-0 flex items-center 1gap-1">
            <span className="truncate">
                {prefix}
            </span>

            {login.isWeb
                ? <OpenUrlIcon isLogin={true} url={login.url} anchorText={all.loginDomain} title={labelOpenLoginScreen} />
                : <LaunchAppIcon isLogin={true} launchData={all.login} title={labelLaunchLoginApp} />
            }

            {cpass.isWeb
                ? <OpenUrlIcon isLogin={false} url={cpass.url} title={labelOpenPasswordChangeScreen} />
                : <LaunchAppIcon isLogin={false} launchData={all.cpass} title={labelLaunchPasswordChangeApp} />
            }
        </div>
    );
}

function OpenUrlIcon({ isLogin, anchorText, url, title }: { isLogin: boolean; anchorText?: string; url: string | undefined; title: string; }) {
    if (!url) {
        return null;
    }
    return (
        <a href={url} className={openContainerClasses} target="_blank" rel="noreferrer noopener" title={title}>
            {anchorText}
            <SymbolOpenLink className={classNames("mx-0.5 size-3 stroke-2", openIconClasses, isLogin && "ml-2")} />
        </a>
    );
}

function LaunchAppIcon({ isLogin, launchData, title }: { isLogin: boolean; launchData: LaunchData; title: string; }) {
    if (!launchData.exe) {
        return null;
    }
    const withMain = hasMain();
    return (
        <button className={openContainerClasses} onClick={() => asyncLaunchExe(launchData.exe, withMain)} title={title}>
            <SymbolOpenLinkRun className={classNames("mx-px pt-0.5 size-3.5 stroke-2! hover:scale-150", openIconClasses, isLogin && "ml-2.5")} />
        </button>
    );
}

const openContainerClasses = "\
text-foreground \
hover:text-foreground \
hover:opacity-100 \
opacity-70 \
underline underline-offset-2 \
cursor-pointer \
flex items-center gap-1";

const openIconClasses = "\
text-foreground \
hover:bg-muted \
hover:scale-125 \
active:scale-90 \
transition-transform \
rounded \
";

//TODO: It is wrong to use meta data here
//TODO: why in XML view there is no open/launch menu items?
