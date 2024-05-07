import { Getter, PrimitiveAtom, Setter } from "jotai";
import { AtomizeWithType, OnValueChange, atomWithCallback } from '@/util-hooks';
import { FileUsAtom, FormIdx } from '@/store/store-types';
import { RowInputState } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls";
import { CreateAtomsParams } from "../../9-types";

export namespace OptionsConv {

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

    export type OptionsForAtoms = {
        uiPart1General: UiPart1General;
        uiPart4QL: UiPart4QL;
        uiPart2ScreenDetection: UiPart2ScreenDetection;
        uiPart3Authentication: UiPart3Authentication;
        uiPart5PasswordManagerIcon: UiPart5PasswordManagerIcon;

        fileUsAtom: FileUsAtom;
        formIdx: FormIdx;
    };

    export type FormOptionsAtoms = {
        uiPart1General: AtomizeWithType<UiPart1General, RowInputState>;
        uiPart4QL: AtomizeWithType<UiPart4QL, RowInputState>;
        uiPart2ScreenDetection: AtomizeWithType<UiPart2ScreenDetection, RowInputState>;
        uiPart3Authentication: AtomizeWithType<UiPart3Authentication, RowInputState>;
        uiPart5PasswordManagerIcon: AtomizeWithType<UiPart5PasswordManagerIcon, RowInputState>;

        fileUsAtom: FileUsAtom;
        formIdx: FormIdx;
    };

    type OnChangeValueWithPpdateName = (updateName: string) => OnValueChange<any>; //TODO: it should be string, but it's any for now, due to some options are boolean

    // Atoms helpers

    function newAtomForInput(value: string, onChange: OnValueChange<RowInputState>, more?: Partial<RowInputState>): PrimitiveAtom<RowInputState> {
        const state: RowInputState = {
            type: 'string',
            data: value,
            initialData: value,
            dirty: false,
            error: undefined,
            touched: undefined,
            validate: undefined,
        };
        const rv = atomWithCallback(more ? { ...state, ...more } : state, onChange);
        return rv;
    }

    function newAtomForCheck(value: boolean, onChange: OnValueChange<RowInputState>): PrimitiveAtom<RowInputState> {
        return newAtomForInput(value ? '1' : '', onChange, { type: 'boolean' });
    }

    // Atoms

    export function forAtoms(createAtomsParams: CreateAtomsParams): OptionsForAtoms {
        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

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
            },
            uiPart3Authentication: {
                aim: options.autoprompt === '1',
                lock: options.lockfields === '1',
            },
            uiPart4QL: {
                dashboard: true,
                name: '',
                url: detection.web_qurl || '',
            },
            uiPart5PasswordManagerIcon: {
                id: options.iconkey || '',
                loc: options.iconlocation || '',
            },

            fileUsAtom,
            formIdx,
        };

        return rv;
    }

    export function toAtoms(initialState: OptionsForAtoms, onChange: OnChangeValueWithPpdateName): FormOptionsAtoms {
        const { uiPart1General, uiPart2ScreenDetection, uiPart3Authentication, uiPart4QL, uiPart5PasswordManagerIcon } = initialState;

        const rv: FormOptionsAtoms = {
            uiPart1General: {
                nameAtom: newAtomForInput(uiPart1General.name, onChange('name')),
                descAtom: newAtomForInput(uiPart1General.desc, onChange('desc')),
                hintAtom: newAtomForInput(uiPart1General.hint, onChange('hint')),
                balloonAtom: newAtomForInput(uiPart1General.balloon, onChange('balloon')),
            },
            uiPart2ScreenDetection: {
                captionAtom: newAtomForInput(uiPart2ScreenDetection.caption, onChange('caption')),
                monitorAtom: newAtomForCheck(uiPart2ScreenDetection.monitor, onChange('monitor')),
                urlAtom: newAtomForInput(uiPart2ScreenDetection.url, onChange('url')),
            },
            uiPart3Authentication: {
                aimAtom: newAtomForCheck(uiPart3Authentication.aim, onChange('aim')),
                lockAtom: newAtomForCheck(uiPart3Authentication.lock, onChange('lock')),
            },
            uiPart4QL: {
                dashboardAtom: newAtomForCheck(uiPart4QL.dashboard, onChange('dashboard')),
                nameAtom: newAtomForInput(uiPart4QL.name, onChange('name')),
                urlAtom: newAtomForInput(uiPart4QL.url, onChange('url')),
            },
            uiPart5PasswordManagerIcon: {
                idAtom: newAtomForInput(uiPart5PasswordManagerIcon.id || '', onChange('id')),
                locAtom: newAtomForInput(uiPart5PasswordManagerIcon.loc || '', onChange('loc')),
            },

            fileUsAtom: initialState.fileUsAtom,
            formIdx: initialState.formIdx,
        };

        return rv;
    }

    export function fromAtoms(atoms: FormOptionsAtoms, get: Getter, set: Setter): OptionsForAtoms {
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
            },
            uiPart3Authentication: {
                aim: get(uiPart3Authentication.aimAtom).data === '1',
                lock: get(uiPart3Authentication.lockAtom).data === '1',
            },
            uiPart4QL: {
                dashboard: get(uiPart4QL.dashboardAtom).data === '1',
                name: get(uiPart4QL.nameAtom).data,
                url: get(uiPart4QL.urlAtom).data,
            },
            uiPart5PasswordManagerIcon: {
                id: get(uiPart5PasswordManagerIcon.idAtom).data,
                loc: get(uiPart5PasswordManagerIcon.locAtom).data,
            },

            fileUsAtom: atoms.fileUsAtom,
            formIdx: atoms.formIdx,
        };

        return rv;
    }

    // Back to manifest

    /** /
    export function forMani(from: OptionsForAtoms, metaForm: Meta.Form) {
        const rv: ThisType = {
            useit: from.useIt,
            displayname: from.label,
            dbname: from.dbname,
            ...fieldTyp2Obj(from.type),
        };
    
        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }
    /**/

}
