import { atom } from "jotai";
import { FileUs, FileUsStats } from "@/store/store-types";
import { TimeUtils } from '@/store/manifest';

export function fileUsStats(fileUs: FileUs): FileUsStats {
    const loginForm = fileUs.parsedSrc.mani?.forms[0];
    const loginFormDomain = fileUs.parsedSrc.meta?.[0]?.disp.domain;
    const isLoginFormWeb = !!loginFormDomain;
    const isSubFolder = !!fileUs.fileCnt.fpath && !fileUs.fileCnt.fromMain; // fpath is empty for single items //const hasSubFolders = !!fileUs.fpath?.match(/\//);

    const rv: FileUsStats = {
        loginFormDomain,
        isLoginFormWeb,
        isLoginFormChrome: isLoginFormWeb && !fileUs.parsedSrc.meta?.[0]?.disp.isIe,
        isFCat: !!fileUs.parsedSrc.fcat,
        isCustomization: !fileUs.parsedSrc.meta?.length && !!fileUs.parsedSrc.mani?.options,
        loginFormChooseNameAtom: atom(loginForm?.options.choosename || ''),
        isSubFolder: isSubFolder,
        subFolder: fileUs.fileCnt.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileUs.fpath) : fileUs.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(fileUs.parsedSrc.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(fileUs.parsedSrc.mani?.descriptor?.modified),
    };
    
    return rv;
}
