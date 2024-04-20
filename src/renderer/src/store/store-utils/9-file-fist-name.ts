import { FileUs } from "@/store/store-types";

export function getFileListDisplayName(fileUs: FileUs) {
    return fileUs.stats.domain || fileUs.fname;
}
