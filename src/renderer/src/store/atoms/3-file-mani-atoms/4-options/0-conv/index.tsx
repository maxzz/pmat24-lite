import { Getter, PrimitiveAtom, Setter } from "jotai";
import { AtomizeWithType, OnValueChange, atomWithCallback } from '@/util-hooks';
import { RowInputState, newAtomForCheck, newAtomForInput, validateManifestName } from "@/ui";
import { FileUsAtom, FormIdx } from '@/store/store-types';
import { FileUsParams } from "../../9-types";

export namespace OptionsConv {

    type UiPart1General = {
        name: string;               // login name
        desc: string;               // login description; Mani.Options.sidekick
        hint: string;               // user hint; Mani.Options.ownernote
        balloon: string;            // show balloon # times; note: value should be a number, but it's stored as string
    };

    type UiPart2ScreenDetection = {
        url: string;                // URL
        caption: string;            // Windows Caption
        monitor: boolean;           // Monitor screen changes

        dlg_tab: string;
        dlg_class: string;
        dlg_checkexe: boolean;
    };

    type UiPart3Authentication = {
        aim: boolean;               // Start authentication immediately
        lock: boolean;              // Lock out login fields
    };

    type UiPart4QL = {
        dashboard: boolean;         // Display on mini-dashboard
        qName: string;              // Quick Link Name
        qUrl: string;               // Quick Link URL
        qUse: boolean;              // Use Quick Link
    };

    type UiPart5PasswordManagerIcon = {
        id: string;                 // Location ID
        loc: string;                // Location
    };

    export type OptionsForAtoms = {
        uiPart1General: UiPart1General;
        uiPart2ScreenDetection: UiPart2ScreenDetection;
        uiPart3Authentication: UiPart3Authentication;
        uiPart4QL: UiPart4QL;
        uiPart5PasswordManagerIcon: UiPart5PasswordManagerIcon;

        isWeb: boolean;
    };

    export type FormOptionsAtoms = {
        uiPart1General: AtomizeWithType<UiPart1General, RowInputState>;
        uiPart2ScreenDetection: AtomizeWithType<UiPart2ScreenDetection, RowInputState>;
        uiPart3Authentication: AtomizeWithType<UiPart3Authentication, RowInputState>;
        uiPart4QL: AtomizeWithType<UiPart4QL, RowInputState>;
        uiPart5PasswordManagerIcon: AtomizeWithType<UiPart5PasswordManagerIcon, RowInputState>;

        isWebAtom: PrimitiveAtom<boolean>;
    };

    type OnChangeValueWithPpdateName = (updateName: string) => OnValueChange<any>; //TODO: it should be string, but it's any for now, due to some options are boolean

    // Atoms

    export function forAtoms(fileUsParams: FileUsParams): OptionsForAtoms {
        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const detection = metaForm.mani?.[formIdx]?.detection || {};
        const options = metaForm.mani?.[formIdx]?.options || {};

        const rv: OptionsForAtoms = {
            uiPart1General: {
                name: options.choosename || '',
                desc: options.sidekick || '',
                hint: options.ownernote || '',
                balloon: options.balooncount || '3',
            },
            uiPart2ScreenDetection: {
                caption: detection.caption || '',                   //TODO: show only for Win32
                monitor: options.recheckwindowafterfillin === '1',  //TODO: strange name for monitor changes
                url: detection.web_ourl || '',

                dlg_tab: detection.dlg_tab || '',
                dlg_class: detection.dlg_class || '',
                dlg_checkexe: detection.dlg_checkexe === '1',
            },
            uiPart3Authentication: {
                aim: options.autoprompt === '1',
                lock: options.lockfields === '1',
            },
            uiPart4QL: {
                dashboard: true,
                qName: '',
                qUrl: detection.web_qurl || '',
                qUse: detection.web_checkurl === '1',
            },
            uiPart5PasswordManagerIcon: {
                id: options.iconkey || '',
                loc: options.iconlocation || '',
            },

            isWeb: fileUs.stats.isWeb,
        };

        return rv;
    }

    export function createAtoms(initialState: OptionsForAtoms, onChange: OnChangeValueWithPpdateName): FormOptionsAtoms {
        const { uiPart1General, uiPart2ScreenDetection, uiPart3Authentication, uiPart4QL, uiPart5PasswordManagerIcon } = initialState;

        const rv: FormOptionsAtoms = {
            uiPart1General: {
                nameAtom: newAtomForInput(uiPart1General.name, onChange('name'), { validate: validateManifestName }),
                descAtom: newAtomForInput(uiPart1General.desc, onChange('desc')),
                hintAtom: newAtomForInput(uiPart1General.hint, onChange('hint')),
                balloonAtom: newAtomForInput(uiPart1General.balloon, onChange('balloon')),
            },
            uiPart2ScreenDetection: {
                captionAtom: newAtomForInput(uiPart2ScreenDetection.caption, onChange('caption')),
                monitorAtom: newAtomForCheck(uiPart2ScreenDetection.monitor, onChange('monitor')),
                urlAtom: newAtomForInput(uiPart2ScreenDetection.url, onChange('url')),

                dlg_tabAtom: newAtomForInput(uiPart2ScreenDetection.dlg_tab, onChange('dlg_tab')),
                dlg_classAtom: newAtomForInput(uiPart2ScreenDetection.dlg_class, onChange('dlg_class')),
                dlg_checkexeAtom: newAtomForCheck(uiPart2ScreenDetection.dlg_checkexe, onChange('dlg_checkexe')),
            },
            uiPart3Authentication: {
                aimAtom: newAtomForCheck(uiPart3Authentication.aim, onChange('aim')),
                lockAtom: newAtomForCheck(uiPart3Authentication.lock, onChange('lock')),
            },
            uiPart4QL: {
                dashboardAtom: newAtomForCheck(uiPart4QL.dashboard, onChange('dashboard')),
                qNameAtom: newAtomForInput(uiPart4QL.qName, onChange('name')),
                qUrlAtom: newAtomForInput(uiPart4QL.qUrl, onChange('url')),
                qUseAtom: newAtomForCheck(uiPart4QL.qUse, onChange('use')),
            },
            uiPart5PasswordManagerIcon: {
                idAtom: newAtomForInput(uiPart5PasswordManagerIcon.id, onChange('id')),
                locAtom: newAtomForInput(uiPart5PasswordManagerIcon.loc, onChange('loc')),
            },

            isWebAtom: atomWithCallback(initialState.isWeb, onChange('isWeb')),
        };

        return rv;
    }

    export function fromAtoms(atoms: FormOptionsAtoms, get: Getter, set: Setter): OptionsForAtoms{
        const { uiPart1General, uiPart2ScreenDetection, uiPart3Authentication, uiPart4QL, uiPart5PasswordManagerIcon } = atoms;

        const rv: OptionsForAtoms = {
            uiPart1General: {
                name: get(uiPart1General.nameAtom).data,
                desc: get(uiPart1General.descAtom).data,
                hint: get(uiPart1General.hintAtom).data,
                balloon: get(uiPart1General.balloonAtom).data,
            },
            uiPart2ScreenDetection: {
                caption: get(uiPart2ScreenDetection.captionAtom).data,
                monitor: get(uiPart2ScreenDetection.monitorAtom).data === '1',
                url: get(uiPart2ScreenDetection.urlAtom).data,

                dlg_tab: get(uiPart2ScreenDetection.dlg_tabAtom).data,
                dlg_class: get(uiPart2ScreenDetection.dlg_classAtom).data,
                dlg_checkexe: get(uiPart2ScreenDetection.dlg_checkexeAtom).data === '1',
            },
            uiPart3Authentication: {
                aim: get(uiPart3Authentication.aimAtom).data === '1',
                lock: get(uiPart3Authentication.lockAtom).data === '1',
            },
            uiPart4QL: {
                dashboard: get(uiPart4QL.dashboardAtom).data === '1',
                qName: get(uiPart4QL.qNameAtom).data,
                qUrl: get(uiPart4QL.qUrlAtom).data,
                qUse: get(uiPart4QL.qUseAtom).data === '1',
            },
            uiPart5PasswordManagerIcon: {
                id: get(uiPart5PasswordManagerIcon.idAtom).data,
                loc: get(uiPart5PasswordManagerIcon.locAtom).data,
            },

            isWeb: get(atoms.isWebAtom),
        };

        return rv;
    }
}
