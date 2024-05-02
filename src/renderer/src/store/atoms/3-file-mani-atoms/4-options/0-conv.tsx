import { Getter, Setter } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { FileUsAtom, FormIdx } from '@/store/store-types';
import { debounce } from '@/utils';
import { CreateAtomsParams, ManiAtoms, ManiChangesAtom } from '../9-types';

type UiPart1General = {
    name: string;       // login name
    desc: string;       // login description; Mani.Options.sidekick
    hint: string;       // user hint; Mani.Options.ownernote
    balloon: string;    // show balloon # times; note: value should be a number, but it's stored as string
};

type UiPart2ScreenDetection = {
    url: string;        // URL
    caption: string;    // Windows Caption
    monitor: boolean;   // Monitor screen changes
};

type UiPart3Authentication = {
    aim: boolean;       // Start authentication immediately
    lock: boolean;      // Lock out login fields
};

type UiPart4QL = {
    dashboard: boolean; // Display on mini-dashboard
    name: string;       // Quick Link Name
    url: string;        // Quick Link URL
};

type UiPart5PasswordManagerIcon = {
    id: string;         // Location ID
    loc: string;        // Location
};

export type FormOptionsAtoms = {
    uiPart1General: Atomize<UiPart1General>;
    uiPart4QL: Atomize<UiPart4QL>;
    uiPart2ScreenDetection: Atomize<UiPart2ScreenDetection>;
    uiPart3Authentication: Atomize<UiPart3Authentication>;
    uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;

    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

export namespace OptionsState {

    export function createAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, onChange: OnValueChangeAny): FormOptionsAtoms {

        const { fileUs, fileUsAtom, formIdx, changesAtom } = createAtomsParams;
        
        const detection = fileUs.mani?.forms?.[formIdx]?.detection || {};
        const options = fileUs.mani?.forms?.[formIdx]?.options || {};

        return {
            uiPart1General: {
                nameAtom: atomWithCallback(options.choosename || '', onChange),
                descAtom: atomWithCallback(options.sidekick || '', onChange),
                hintAtom: atomWithCallback(options.ownernote || '', onChange),
                balloonAtom: atomWithCallback(options.balooncount || '3', onChange),
            },
            uiPart2ScreenDetection: {
                captionAtom: atomWithCallback(detection.caption || '', onChange), //TODO: show only for Win32
                monitorAtom: atomWithCallback(options.recheckwindowafterfillin === '1', onChange), //TODO: strange name for monitor changes
                urlAtom: atomWithCallback(detection.web_ourl || '', onChange),
            },
            uiPart3Authentication: {
                aimAtom: atomWithCallback(options.autoprompt === '1', onChange),
                lockAtom: atomWithCallback(options.lockfields === '1', onChange),
            },
            uiPart4QL: {
                dashboardAtom: atomWithCallback(true, onChange),
                nameAtom: atomWithCallback('', onChange),
                urlAtom: atomWithCallback(detection.web_qurl || '', onChange),
            },
            uiPart5PasswordManagerIcon: {
                idAtom: atomWithCallback(options.iconkey || '', onChange),
                locAtom: atomWithCallback(options.iconlocation || '', onChange),
            },

            fileUsAtom,
            formIdx,
        };
    }

    export function combineOptionsFromAtoms(atoms: FormOptionsAtoms, changesAtom: ManiChangesAtom, get: Getter, set: Setter) {
        const { uiPart1General, uiPart2ScreenDetection, uiPart3Authentication, uiPart4QL, uiPart5PasswordManagerIcon } = atoms;

        const result = {
            uiPart1General: {
                'name': get(uiPart1General.nameAtom),
                'desc': get(uiPart1General.descAtom),
                'hint': get(uiPart1General.hintAtom),
                'balloon': +get(uiPart1General.balloonAtom),
            },
            uiPart2ScreenDetection: {
                'caption': get(uiPart2ScreenDetection.captionAtom),
                'monitor': get(uiPart2ScreenDetection.monitorAtom),
                'url': get(uiPart2ScreenDetection.urlAtom),
            },
            uiPart3Authentication: {
                'aim': get(uiPart3Authentication.aimAtom),
                'lock': get(uiPart3Authentication.lockAtom),
            },
            uiPart4QL: {
                'dashboard': get(uiPart4QL.dashboardAtom),
                'name': get(uiPart4QL.nameAtom),
                'url': get(uiPart4QL.urlAtom),
            },
            uiPart5PasswordManagerIcon: {
                'id': get(uiPart5PasswordManagerIcon.idAtom),
                'loc': get(uiPart5PasswordManagerIcon.locAtom),
            },
        };

        // console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
}
