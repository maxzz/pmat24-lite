import { atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type ParsedSrc, type FileUsStats } from "@/store/store-types";
import { TimeUtils } from '@/store/manifest';

export function fileUsStats(fileCnt: FileContent, parsedSrc: ParsedSrc): FileUsStats {
    const loginForm = parsedSrc.mani?.forms[0];
    const loginFormDomain = parsedSrc.meta?.[0]?.disp.domain;
    const isLoginFormWeb = !!loginFormDomain;
    const isSubFolder = !!fileCnt.fpath && !fileCnt.fromMain; // fpath is empty for single items //const hasSubFolders = !!fileCnt.fpath?.match(/\//);

    const rv: FileUsStats = {
        loginFormDomain,
        isLoginFormWeb,
        isLoginFormChrome: isLoginFormWeb && !parsedSrc.meta?.[0]?.disp.isIe,
        isFCat: !!parsedSrc.fcat,
        isCustomization: !parsedSrc.meta?.length && !!parsedSrc.mani?.options,
        loginFormChooseNameAtom: atom(loginForm?.options.choosename || ''),
        isSubFolder: isSubFolder,
        subFolder: fileCnt.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileCnt.fpath) : fileCnt.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(parsedSrc.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(parsedSrc.mani?.descriptor?.modified),
    };
    
    return rv;
}
