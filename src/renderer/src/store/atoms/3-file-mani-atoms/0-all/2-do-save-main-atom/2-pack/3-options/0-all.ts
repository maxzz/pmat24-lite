import { type Mani } from "@/store/manifest";
import { type FormOptionsState, FormOptionsConv } from "../../../../4-options";
import { type PackManifestDataParams } from "../9-types";

export function packFormOptions(optionsAtoms: FormOptionsState.AllAtoms, packParams: PackManifestDataParams) {
    const { get, set } = packParams;
    const detectionAndOptionsRow = FormOptionsConv.fromAtoms(optionsAtoms, get, set);

    const rv = {
        detection: detectionForMani(detectionAndOptionsRow),
        options: optionsForMani(detectionAndOptionsRow),
    };
    // console.log('options', JSON.stringify(rv, null, 2).replace(/"names_ext":\s".*",/, '"names_ext": "...",'));
    return rv;
}

function detectionForMani(values: FormOptionsState.ForAtoms): Mani.Detection {
    const { p2Detect: detect } = values;

    const rv: Mani.Detection = {
        caption: detect.caption,
        variablecaption: detect.variablecaption,

        web_ourl: detect.ourl,
        web_murl: detect.murl === detect.ourl ? undefined : detect.murl,
        web_qurl: values.p4QL.qUrl === detect.ourl ? undefined : values.p4QL.qUrl,
        web_checkurl: detect.webCheckUrl,

        dlg_class: detect.dlg_class,
        dlg_tab: detect.dlg_tab,
        dlg_checkexe: detect.dlg_checkexe,

        emu_pattern: detect.emu_pattern,
        names: detect.names,
        names_ext: detect.names_ext,
        processname: detect.processname,
        commandline: detect.commandline,
    };
    return rv;
}

function optionsForMani(values: FormOptionsState.ForAtoms): Mani.Options {
    const { p1General: general, p3Auth, p4QL, p5Icon, p2Detect } = values;

    const submitType =
        general.submitType === 'dosubmit' || general.submitType === 'nosubmit'
            ? general.submitType
            : undefined;

    const rv: Mani.Options = {
        choosename: general.name,
        sidekick: general.desc,
        ownernote: general.hint,
        quicklink: general.qlName,

        auth_pl: p3Auth.auth_pl,
        balooncount: general.balloon,
        autoprompt: p3Auth.aim ? '1' : undefined,
        lockfields: p3Auth.lock ? '1' : undefined,
        submittype: submitType,
        iconkey: p5Icon.id,
        iconlocation: p5Icon.loc,

        usequicklink: p4QL.qUse ? '1' : '2',
        recheckwindowafterfillin: p2Detect.reCheck ? '1' : undefined,
        qlwocred: general.qlWoCred ? '1' : undefined,

        unknownattributes: general.unkAttrs,
    };
    return rv;
}
