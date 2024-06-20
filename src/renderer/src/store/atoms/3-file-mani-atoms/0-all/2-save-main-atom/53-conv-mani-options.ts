import { FileMani } from "@/store/manifest";
import { OptionsConv } from "../../4-options";

function detectionForMani(options: OptionsConv.OptionsForAtoms): FileMani.Detection {
    const rv: FileMani.Detection = {
        caption: options.p2Detect.caption,
        variablecaption: options.p2Detect.caption,

        web_ourl: options.p2Detect.url,
        web_murl: options.p2Detect.url,
        web_qurl: options.p4QL.qUrl,
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

function optionsForMani(options: OptionsConv.OptionsForAtoms): FileMani.Options {

    const submitType = options.p1General.submitType === 'dosubmit' || options.p1General.submitType === 'dosubmit'
        ? options.p1General.submitType
        : undefined;

    const rv: FileMani.Options = {
        choosename: options.p1General.name,
        sidekick: options.p1General.desc,
        ownernote: options.p1General.hint,
        quicklink: options.p1General.qlName,

        auth_pl: options.p3Auth.auth_pl,
        balooncount: options.p1General.balloon,
        autoprompt: options.p3Auth.aim ? '1' : undefined,
        lockfields: options.p3Auth.lock ? '1' : undefined,
        submittype: submitType,
        iconkey: options.p5Icon.id,
        iconlocation: options.p5Icon.loc,

        usequicklink: options.p4QL.qUse ? '1' : '2',
        recheckwindowafterfillin: options.p2Detect.reCheck ? '1' : undefined,
        qlwocred: options.p1General.qlWoCred ? '1' : undefined,

        unknownattributes: options.p1General.unkAttrs,
    };
    return rv;
}

export type DAOForMani = { // Detection And Options ForMani
    detection?: FileMani.Detection;
    options?: FileMani.Options;
};

export function detectionAndOptionsForMani(options: OptionsConv.OptionsForAtoms): DAOForMani {
    const rv: DAOForMani = {
        detection: detectionForMani(options),
        options: optionsForMani(options),
    };
    return rv;
}
