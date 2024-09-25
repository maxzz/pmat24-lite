import { type Mani } from "@/store/manifest";
import { type FormOptionsState } from "../../../../4-options";

export function formOptionsForMani(options: FormOptionsState.ForAtoms): Mani.Options {

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
