import { type Mani, FormIdx, Matching } from "@/store/manifest";
import { type FormOptionsState, FormOptionsConv } from "@/store/2-file-mani-atoms/3-options";
import { type PackManifestDataParams } from "../9-types";

export function packFormOptions(optionsAtoms: FormOptionsState.AllAtoms, formIdx: FormIdx, packParams: PackManifestDataParams) {
    const detectionAndOptionsRow = FormOptionsConv.fromAtoms(optionsAtoms, packParams.getset);

    const rv = {
        detection: detectionForMani(detectionAndOptionsRow),
        options: optionsForMani(detectionAndOptionsRow, formIdx),
    };
    // console.log('options', JSON.stringify(rv, null, 2).replace(/"names_ext":\s".*",/, '"names_ext": "...",'));

    return rv;
}

function getMurl(detect: FormOptionsState.ForAtoms['p2Detect']): string { // If regex is the same as original URL then reset it to empty
    const md: Matching.RawMatchData = Matching.parseRawMatchData(detect.murl);
    const invalidRegex = md.how === Matching.How.regex && (md.url === detect.ourl || !md.url.trim()); // Don't need to check md.opt === Matching.Options.undef
    const murl = invalidRegex
        ? ''
        : detect.murl === detect.ourl
            ? ''
            : detect.murl;
    return murl;
}

function detectionForMani(values: FormOptionsState.ForAtoms): Mani.Detection {
    const { p2Detect: detect } = values;

    const rv: Mani.Detection = {
        caption: detect.caption,
        variablecaption: detect.variablecaption,

        web_ourl: detect.ourl,
        web_murl: getMurl(detect),
        web_qurl: values.p4QL.qUrl === detect.ourl ? '' : values.p4QL.qUrl,
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

function optionsForMani(values: FormOptionsState.ForAtoms, formIdx: FormIdx): Mani.Options {
    const { p1General: general, p3Auth, p4QL, p5Icon, p2Detect } = values;

    const submitType =
        general.submitType === 'dosubmit' || general.submitType === 'nosubmit'
            ? general.submitType
            : undefined;

    const authPolicy = formIdx === FormIdx.cpass || p3Auth.auth_pl === '0' ? undefined : p3Auth.auth_pl;

    const rv: Mani.Options = {
        choosename: general.name,
        sidekick: general.desc,
        ownernote: general.hint,
        quicklink: general.qlName,

        auth_pl: authPolicy,
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
