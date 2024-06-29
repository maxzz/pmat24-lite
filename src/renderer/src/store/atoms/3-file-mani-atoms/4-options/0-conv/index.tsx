import { Getter, PrimitiveAtom, Setter } from "jotai";
import { AtomizeWithType, OnValueChange, atomWithCallback } from '@/util-hooks';
import { RowInputState, newAtomForCheck, newAtomForInput, validateManifestName } from "@/ui";
import { FormIdx } from "@/store/store-types";
import { FileUsParams } from "../../9-types";

export namespace OptionsConv {

    type p1General = {              // Part General
        name: string;               // login name
        desc: string;               // login description; Mani.Options.sidekick
        hint: string;               // user hint; Mani.Options.ownernote
        balloon: string;            // show balloon # times; note: value should be a number, but it's stored as string
        submitType: string;         // "dosubmit" | "nosubmit"
        qlName: string;             // Quick Link Name
        qlWoCred: boolean;          // Quick reauthentication enable/disable (QL wo/ crededntials). I'm not sure why it's here at all
        unkAttrs: string;           // unknown attributes
    };

    type p2Detect = {               // Part Screen Detection
        url: string;                // URL
        caption: string;            // Windows Caption
        monitor: boolean;           // Monitor screen changes

        dlg_tab: string;
        dlg_class: string;
        dlg_checkexe: boolean;

        emu_pattern: string;

        names: string;
        names_ext: string;
        processname: string;
        commandline: string;

        reCheck: boolean;           // re-check windowa after fillin
    };

    type p3Auth = {                 // Part Authentication
        aim: boolean;               // Start authentication immediately
        lock: boolean;              // Lock out login fields
        auth_pl: string;            // extended policy (see AuthTokenValues); only one bit as hex string (auth_pl="100"); used only for login form
    };

    type p4QL = {                   // Part Quick Links
        dashboard: boolean;         // Display on mini-dashboard
        qName: string;              // Quick Link Name
        qUrl: string;               // Quick Link URL
        qUse: boolean;              // Use Quick Link
    };

    type p5Icon = {                 // Part Password Manager Icon
        id: string;                 // Location ID
        loc: string;                // Location
    };

    export type OptionsForAtoms = {
        p1General: p1General;
        p2Detect: p2Detect;
        p3Auth: p3Auth;
        p4QL: p4QL;
        p5Icon: p5Icon;

        isWeb: boolean;
        formIdx: FormIdx;
    };

    export type FormOptionsAtoms = {
        p1General: AtomizeWithType<p1General, RowInputState>;
        p2Detect: AtomizeWithType<p2Detect, RowInputState>;
        p3Auth: AtomizeWithType<p3Auth, RowInputState>;
        p4QL: AtomizeWithType<p4QL, RowInputState>;
        p5Icon: AtomizeWithType<p5Icon, RowInputState>;

        isWebAtom: PrimitiveAtom<boolean>;
        formIdx: FormIdx;
    };

    type OnChangeValueWithPpdateName = (updateName: string) => OnValueChange<any>; //TODO: it should be string, but it's any for now, due to some options are boolean

    // Atoms

    export function forAtoms(fileUsParams: FileUsParams): OptionsForAtoms {
        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const maniForm = metaForm.mani;
        const detection = maniForm?.detection || {};
        const options = maniForm?.options || {};

        const rv: OptionsForAtoms = {
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
                url: detection.web_ourl || '',

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

            isWeb: fileUs.stats.isWeb,
            formIdx,
        };

        return rv;
    }

    export function createAtoms(initialState: OptionsForAtoms, onChange: OnChangeValueWithPpdateName): FormOptionsAtoms {
        const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = initialState;

        const rv: FormOptionsAtoms = {
            p1General: {
                nameAtom: newAtomForInput(p1General.name, onChange('name'), { validate: validateManifestName }),
                descAtom: newAtomForInput(p1General.desc, onChange('desc')),
                hintAtom: newAtomForInput(p1General.hint, onChange('hint')),
                balloonAtom: newAtomForInput(p1General.balloon, onChange('balloon')),
                submitTypeAtom: newAtomForInput(p1General.submitType, onChange('submitType')),
                qlNameAtom: newAtomForInput(p1General.qlName, onChange('qlName')),
                qlWoCredAtom: newAtomForCheck(p1General.qlWoCred, onChange('qlWoCred')),
                unkAttrsAtom: newAtomForInput(p1General.unkAttrs, onChange('unkAttrs')),
            },
            p2Detect: {
                captionAtom: newAtomForInput(p2Detect.caption, onChange('caption')),
                monitorAtom: newAtomForCheck(p2Detect.monitor, onChange('monitor')),
                urlAtom: newAtomForInput(p2Detect.url, onChange('url')),

                dlg_tabAtom: newAtomForInput(p2Detect.dlg_tab, onChange('dlg_tab')),
                dlg_classAtom: newAtomForInput(p2Detect.dlg_class, onChange('dlg_class')),
                dlg_checkexeAtom: newAtomForCheck(p2Detect.dlg_checkexe, onChange('dlg_checkexe')),

                emu_patternAtom: newAtomForInput(p2Detect.emu_pattern, onChange('emu_pattern')),
                namesAtom: newAtomForInput(p2Detect.names, onChange('names')),
                names_extAtom: newAtomForInput(p2Detect.names_ext, onChange('names_ext')),
                processnameAtom: newAtomForInput(p2Detect.processname, onChange('processname')),
                commandlineAtom: newAtomForInput(p2Detect.commandline, onChange('commandline')),

                reCheckAtom: newAtomForCheck(p2Detect.reCheck, onChange('recheckwindowafterfillin')),
            },
            p3Auth: {
                aimAtom: newAtomForCheck(p3Auth.aim, onChange('aim')),
                lockAtom: newAtomForCheck(p3Auth.lock, onChange('lock')),
                auth_plAtom: newAtomForInput(p3Auth.auth_pl, onChange('auth_pl')),
            },
            p4QL: {
                dashboardAtom: newAtomForCheck(p4QL.dashboard, onChange('dashboard')),
                qNameAtom: newAtomForInput(p4QL.qName, onChange('name')),
                qUrlAtom: newAtomForInput(p4QL.qUrl, onChange('url')),
                qUseAtom: newAtomForCheck(p4QL.qUse, onChange('use')),
            },
            p5Icon: {
                idAtom: newAtomForInput(p5Icon.id, onChange('id')),
                locAtom: newAtomForInput(p5Icon.loc, onChange('loc')),
            },

            isWebAtom: atomWithCallback(initialState.isWeb, onChange('isWeb')),
            formIdx: initialState.formIdx,
        };

        return rv;
    }

    export function fromAtoms(atoms: FormOptionsAtoms, get: Getter, set: Setter): OptionsForAtoms {
        const { p1General: p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

        const rv: OptionsForAtoms = {
            p1General: {
                name: get(p1General.nameAtom).data,
                desc: get(p1General.descAtom).data,
                hint: get(p1General.hintAtom).data,
                balloon: get(p1General.balloonAtom).data,
                qlName: get(p1General.qlNameAtom).data,
                submitType: get(p1General.submitTypeAtom).data,
                qlWoCred: get(p1General.qlWoCredAtom).data === '1',
                unkAttrs: get(p1General.unkAttrsAtom).data,
            },
            p2Detect: {
                caption: get(p2Detect.captionAtom).data,
                monitor: get(p2Detect.monitorAtom).data === '1',
                url: get(p2Detect.urlAtom).data,

                dlg_tab: get(p2Detect.dlg_tabAtom).data,
                dlg_class: get(p2Detect.dlg_classAtom).data,
                dlg_checkexe: get(p2Detect.dlg_checkexeAtom).data === '1',

                emu_pattern: get(p2Detect.emu_patternAtom).data,
                names: get(p2Detect.namesAtom).data,
                names_ext: get(p2Detect.names_extAtom).data,
                processname: encodeURIComponent(get(p2Detect.processnameAtom).data),
                commandline: encodeURIComponent(get(p2Detect.commandlineAtom).data),

                reCheck: get(p2Detect.reCheckAtom).data === '1',
            },
            p3Auth: {
                aim: get(p3Auth.aimAtom).data === '1',
                lock: get(p3Auth.lockAtom).data === '1',
                auth_pl: get(p3Auth.auth_plAtom).data,
            },
            p4QL: {
                dashboard: get(p4QL.dashboardAtom).data === '1',
                qName: get(p4QL.qNameAtom).data,
                qUrl: get(p4QL.qUrlAtom).data,
                qUse: get(p4QL.qUseAtom).data === '1',
            },
            p5Icon: {
                id: get(p5Icon.idAtom).data,
                loc: get(p5Icon.locAtom).data,
            },

            isWeb: get(atoms.isWebAtom),
            formIdx: atoms.formIdx,
        };

        return rv;
    }

    export function verifyAtoms(atoms: FormOptionsAtoms, formIdx: FormIdx, get: Getter, set: Setter): string[] {
        const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

        const toValidate = formIdx
            ? { ...p1General, ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon }
            : { ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon };

        const rv: string[] = Object.entries(toValidate).map(
            ([key, atom]): string | undefined => {
                const atomValue = get(atom);
                const error = atomValue.validate?.(atomValue.data);
                return error;
            }
        ).filter(Boolean);

        return rv;
    }
}
