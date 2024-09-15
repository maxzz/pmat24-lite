import { type FileUsCtx } from "../../9-types";
import { type ManiOptions } from "./9-types";

export function forAtoms(fileUsCtx: FileUsCtx): ManiOptions.OptionsForAtoms {
    const { fileUs, formIdx } = fileUsCtx;

    const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
    const maniForm = metaForm.mani;
    const options = maniForm?.options || {};
    const detection = maniForm?.detection || {};
    const isFormWeb = !!detection.web_ourl;

    const rv: ManiOptions.OptionsForAtoms = {
        p1General: {
            name: options.choosename || '',
            desc: options.sidekick || '',
            hint: options.ownernote || '',
            balloon: options.balooncount || '3',
            submitType: options.submittype || '',
            qlName: options.quicklink || '',
            qlWoCred: options.qlwocred === '1',
            unkAttrs: options.unknownattributes || '',
        },
        p2Detect: {
            caption: detection.caption || '',                   //TODO: show only for Win32
            monitor: options.recheckwindowafterfillin === '1',  //TODO: strange name for monitor changes
            ourl: detection.web_ourl || '',
            murl: detection.web_murl || '',

            dlg_tab: detection.dlg_tab || '',
            dlg_class: detection.dlg_class || '',
            dlg_checkexe: !!detection.dlg_checkexe,

            emu_pattern: detection.emu_pattern || '',
            names: detection.names || '',
            names_ext: detection.names_ext || '',
            processname: decodeURIComponent(detection.processname || ''),
            commandline: decodeURIComponent(detection.commandline || ''),

            reCheck: options.recheckwindowafterfillin === '1',
        },
        p3Auth: {
            aim: options.autoprompt === '1',
            lock: options.lockfields === '1',
            auth_pl: options.auth_pl || '',
        },
        p4QL: {
            dashboard: true,
            qName: '',
            qUrl: detection.web_qurl || '',
            qUse: !!detection.web_checkurl,
        },
        p5Icon: {
            id: options.iconkey || '',
            loc: options.iconlocation || '',
        },

        isFormWeb,
        formIdx,
    };

    return rv;
}
