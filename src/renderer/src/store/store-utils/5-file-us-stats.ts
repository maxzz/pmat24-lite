import { atom } from "jotai";
import { FileUs, FileUsStats } from "@/store/store-types";
import { TimeUtils } from '@/store/manifest';

export function fileUsStats(fileUs: FileUs): FileUsStats {
    const loginForm = fileUs.mani?.forms[0];
    const loginFormDomain = fileUs.meta?.[0]?.disp.domain;
    const isLoginFormWeb = !!loginFormDomain;
    const isCpassFormWeb = !!fileUs.meta?.[1]?.disp.domain;
    const isSubFolder = !!fileUs.fpath; // fpath is empty for single items //const hasSubFolders = !!fileUs.fpath?.match(/\//);

    const rv: FileUsStats = {
        loginFormDomain,
        isLoginFormWeb,
        isLoginFormChrome: isLoginFormWeb && !fileUs.meta?.[0]?.disp.isIe,
        isCpassFormWeb,
        isFCat: !!fileUs.fcat,
        isCustomization: !fileUs.meta?.length && !!fileUs.mani?.options,
        loginFormChooseNameAtom: atom(loginForm?.options.choosename || ''),
        isSubFolder: isSubFolder,
        subFolder: fileUs.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileUs.fpath) : fileUs.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified),
    };
    
    return rv;
}
