import { FileUs, FileUsStats } from "@/store/store-types";
import { TimeUtils } from '@/store/manifest';

export function fileUsStats(fileUs: FileUs): FileUsStats {
    const loginForm = fileUs.mani?.forms[0];
    const domain = fileUs.meta?.[0]?.disp.domain;
    const isWeb = !!domain;
    const isSubFolder = !!fileUs.fpath; // fpath is empty for single items //const hasSubFolders = !!fileUs.fpath?.match(/\//);
    return {
        domain,
        isWeb,
        isChrome: isWeb && !fileUs.meta?.[0]?.disp.isIe,
        isFCat: !!fileUs.fcat,
        isCustomization: !fileUs.meta?.length && !!fileUs.mani?.options,
        url: loginForm?.detection.web_ourl,
        title: loginForm?.options.choosename,
        isSubFolder: isSubFolder,
        subFolder: fileUs.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileUs.fpath) : fileUs.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified),
    };
}
