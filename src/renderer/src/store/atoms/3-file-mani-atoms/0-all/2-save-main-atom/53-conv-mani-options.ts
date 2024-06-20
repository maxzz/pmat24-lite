import { Mani } from "pm-manifest";
import { FileMani } from "@/store/manifest";
import { OptionsConv } from "../../4-options";

/** /
function detectionForMani(options: OptionsConv.OptionsForAtoms): FileMani.Detection {
    const rv: FileMani.Detection = {
        caption: options.uiPart2ScreenDetection.caption,
        variablecaption: options.uiPart2ScreenDetection.caption,
        
        web_ourl: options.uiPart2ScreenDetection.url,
        web_murl: options.uiPart2ScreenDetection.url,
        web_qurl: options.uiPart4QL.qUrl,
        web_checkurl: options.uiPart4QL.qUse ? '1' : undefined,

        dlg_class: options.ui
    };
    return rv;
}

function optionsForMani(options: OptionsConv.OptionsForAtoms): FileMani.Options {
    const rv: FileMani.Options = {
        choosename: options.uiPart1General.name,
        sidekick: options.uiPart1General.desc,
        ownernote: options.uiPart1General.hint,
        quicklink: options.uiPart4QL.dashboard,
        auth_pl: options.uiPart3Authentication.aim,
        balooncount: options.uiPart1General.balloon,
        autoprompt: options.uiPart3Authentication.aim,
        lockfields: options.uiPart3Authentication.lock,
        submittype: options.uiPart5PasswordManagerIcon.id,
        iconkey: options.uiPart5PasswordManagerIcon.id,
        iconlocation: options.uiPart5PasswordManagerIcon.loc,
        usequicklink: options.uiPart4QL.dashboard,
        recheckwindowafterfillin: options.uiPart2ScreenDetection.monitor ? '1' : '0',
        qlwocred: options.uiPart4QL.url,
        //unknownattributes
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
/**/