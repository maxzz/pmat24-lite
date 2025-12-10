import { Matching } from "@/store/8-manifest";
import { type FileUsCtx } from "../../9-types";
import { type FormOptionsState } from "./9-types";
import { parseIconLocation } from "@/store/8-manifest/4-icon-location/8-icon-location-io";

export function forAtoms(fileUsCtx: FileUsCtx): FormOptionsState.ForAtoms {
    const { fileUs, formIdx } = fileUsCtx;

    const metaForm = fileUs.parsedSrc.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
    const maniForm = metaForm.mani;

    const options = maniForm?.options || {};
    const detection = maniForm?.detection || {};
    const isFormWeb = !!detection.web_ourl;

    const fromFileHOU = Matching.parseRawMatchData(detection.web_murl || '');
    const iconLocation = parseIconLocation(options.iconlocation);

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
            quadrand: `${iconLocation.quadrand}`,
            x: `${iconLocation.x}`,
            y: `${iconLocation.y}`,
        },

        isFormWeb,
        formIdx,

        fromFileHOU,
        murl_how: fromFileHOU.how,
        murl_opt: fromFileHOU.opt,
        murl_regex: fromFileHOU.url,

        iconLocFromFile: options.iconlocation || '',
    };

    return rv;
}

//TODO: add function that will convert string to:
//  if caption "[m0]:2:1:name" starts with "[m0]:2:1:" returns {caption: "*name", variablecaption: "name"}
//  if caption "[m0]:2:2:name" starts with "[m0]:2:2:" returns {caption: "name*", variablecaption: "name"}
//  if caption "[m0]:2:3:name" starts with "[m0]:2:3:" returns {caption: "*name*", variablecaption: "name"}
//  otherwise returns {caption: "name", variablecaption: "name"}

/**
 * Converts a caption string with a special marker (e.g., "[m0]:2:1:name") into
 * an object with the appropriate `caption` and `variablecaption` values.
 *
 * This is used in manifests to support window caption matching with wildcards.
 *
 * The formats supported are:
 *   - "[m0]:2:1:name" --> { caption: "*name", variablecaption: "name" }
 *   - "[m0]:2:2:name" --> { caption: "name*", variablecaption: "name" }
 *   - "[m0]:2:3:name" --> { caption: "*name*", variablecaption: "name" }
 *   - Any other string (including empty string) returns:
 *         { caption: <input>, variablecaption: <input> }
 *
 * This logic helps abstract away the parsing of caption with wildcards and
 * lets the UI display both the wildcarded caption (for preview) and the plain
 * variable part (for editing).
 *
 * @param caption The source caption string, possibly in special marker format.
 * @returns Object with `caption` (including wildcards as required) and `variablecaption` (the variable part).
 */
export function unpackCaption(caption: string): { caption: string, variablecaption: string } {
    // Try to match one of the known special patterns by regex:
    // - [m0]:2:1:<name>
    // - [m0]:2:2:<name>
    // - [m0]:2:3:<name>
    const match = caption.match(/^\[m0\]:2:([123]):(.*)$/);
    if (match) {
        const [, type, name] = match;
        // Map each code to its wildcard caption style
        const format = { '1': `*${name}`, '2': `${name}*`, '3': `*${name}*` };
        return { caption: format[type as keyof typeof format], variablecaption: name };
    }
    // For regular captions (no marker), return as both fields
    return { caption, variablecaption: caption };
}

/**
 * The inverse of `unpackCaption`.
 *
 * Given a caption and the variablecaption, produces the original marker string representation if
 * there are wildcards at the beginning/end of the caption. Otherwise, returns the plain caption.
 *
 * This version ensures correct synchronization during saving or editing (UI or export).
 *
 * Example:
 *   - ('*name',   'name') => "[m0]:2:1:name"
 *   - ('name*',   'name') => "[m0]:2:2:name"
 *   - ('*name*',  'name') => "[m0]:2:3:name"
 *   - ('hello',   'hello') => 'hello'
 *
 * @param caption Usually the user's edited text, possibly including * at start/end.
 * @param variablecaption The variable part, as edited by user or parsed before.
 * @returns The marker string if needed, or unchanged caption.
 */
export function packCaptionToMain(caption: string, variablecaption: string): string {
    // See if the caption starts/ends with a '*'
    const start = caption.startsWith('*');
    const end = caption.endsWith('*');

    if (start || end) {
        // Both wildcards present (both ends): type '3'
        // Only start: type '1', only end: type '2'
        const type = start && end ? '3' : start ? '1' : '2';
        return `[m0]:2:${type}:${variablecaption}`;
    }
    // No special marker; return the caption as-is
    return caption;
}
