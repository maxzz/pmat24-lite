import { type Mani } from "@/store/manifest";
import { type FormOptionsState, OptionsConv } from "../../../../4-options";
import { type PackManifestDataParams } from "../9-types";

export function packFormOptions(optionsAtoms: FormOptionsState.AllAtoms, packParams: PackManifestDataParams) {
    const { get, set } = packParams;

    const detectionAndOptionsRow = OptionsConv.fromAtoms(optionsAtoms, get, set);

    const rv = {
        detection: formDetectionForMani(detectionAndOptionsRow),
        options: formOptionsForMani(detectionAndOptionsRow),
    };
    // console.log('options', JSON.stringify(rv, null, 2).replace(/"names_ext":\s".*",/, '"names_ext": "...",'));

    return rv;
}

function formDetectionForMani(options: FormOptionsState.ForAtoms): Mani.Detection {
    const rv: Mani.Detection = {
        caption: options.p2Detect.caption,
        variablecaption: options.p2Detect.variablecaption,

        web_ourl: options.p2Detect.ourl,
        web_murl: options.p2Detect.murl === options.p2Detect.ourl ? undefined : options.p2Detect.murl,
        web_qurl: options.p4QL.qUrl === options.p2Detect.ourl ? undefined : options.p4QL.qUrl,
        web_checkurl: options.p4QL.qUse,

        dlg_class: options.p2Detect.dlg_class,
        dlg_tab: options.p2Detect.dlg_tab,
        dlg_checkexe: options.p2Detect.dlg_checkexe,

        emu_pattern: options.p2Detect.emu_pattern,
        names: options.p2Detect.names,
        names_ext: options.p2Detect.names_ext,
        processname: options.p2Detect.processname,
        commandline: options.p2Detect.commandline,
    };
    return rv;
}

function formOptionsForMani(options: FormOptionsState.ForAtoms): Mani.Options {

    const submitType =
        options.p1General.submitType === 'dosubmit' || options.p1General.submitType === 'nosubmit'
            ? options.p1General.submitType
            : undefined;

    const rv: Mani.Options = {
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
