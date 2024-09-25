import { type FileMani } from "@/store/manifest";
import { type ManiOptions } from "../../../../4-options";

export function formDetectionForMani(options: ManiOptions.ForAtoms): FileMani.Detection {
    const rv: FileMani.Detection = {
        caption: options.p2Detect.caption,
        variablecaption: options.p2Detect.variablecaption,

        web_ourl: options.p2Detect.ourl,
        web_murl: options.p2Detect.murl === options.p2Detect.ourl ? undefined : options.p2Detect.murl,
        web_qurl: options.p4QL.qUrl === options.p2Detect.ourl ? undefined : options.p4QL.qUrl,
        web_checkurl: options.p4QL.qUse ? '1' : undefined,

        dlg_class: options.p2Detect.dlg_class,
        dlg_tab: options.p2Detect.dlg_tab,
        dlg_checkexe: options.p2Detect.dlg_checkexe ? '1' : undefined,

        emu_pattern: options.p2Detect.emu_pattern,
        names: options.p2Detect.names,
        names_ext: options.p2Detect.names_ext,
        processname: options.p2Detect.processname,
        commandline: options.p2Detect.commandline,
    };
    return rv;
}
