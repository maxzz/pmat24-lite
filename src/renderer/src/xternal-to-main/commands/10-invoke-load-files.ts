import { proxySet } from "valtio/utils";
import { R2MInvoke, type FileContent, type MainFileContent } from "@shared/ipc-types";
import { mainApi } from "../to-main-apis";
import { uuid } from "@/store/manifest";

export async function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<FileContent[]> {
    const d: R2MInvoke.AllInvokes = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };

    const rv = await mainApi?.invokeMain(d) as MainFileContent[];
    return rv.map(fullfillFileContent);
}

export function fullfillFileContent(fileContent: MainFileContent): FileContent {
    const rv = fileContent as FileContent;
    rv.unid = uuid.asRelativeNumber();
    rv.changesSet = proxySet<string>();
    return rv;
}
