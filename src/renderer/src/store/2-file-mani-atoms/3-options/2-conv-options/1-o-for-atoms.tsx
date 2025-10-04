import { Matching } from "@/store/manifest";
import { type FileUsCtx } from "../../9-types";
import { type FormOptionsState } from "./9-types";

export function forAtoms(fileUsCtx: FileUsCtx): FormOptionsState.ForAtoms {
    const { fileUs, formIdx } = fileUsCtx;

    const metaForm = fileUs.parsedSrc.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
    const maniForm = metaForm.mani;

    const options = maniForm?.options || {};
    const detection = maniForm?.detection || {};
    const isFormWeb = !!detection.web_ourl;

    const fromFileHOU = Matching.parseRawMatchData(detection.web_murl || '');

    const rv: FormOptionsState.ForAtoms = {
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
            variablecaption: detection.variablecaption || '',   //TODO: show only for Win32
            monitor: options.recheckwindowafterfillin === '1',  //TODO: strange name for monitor changes

            ourl: detection.web_ourl || '',
            murl: detection.web_murl || '',

            webCheckUrl: !!detection.web_checkurl,

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
            qName: options.quicklink || '',
            qUrl: detection.web_qurl || '',
            qUse: !options.usequicklink || options.usequicklink === '1', // to exclude '2' as unuse quicklink value
        },
        p5Icon: {
            id: options.iconkey || '',
            loc: options.iconlocation || '',
        },

        isFormWeb,
        formIdx,

        fromFileHOU,
        murl_how: fromFileHOU.how,
        murl_opt: fromFileHOU.opt,
        murl_regex: fromFileHOU.url,
    };

    return rv;
}
