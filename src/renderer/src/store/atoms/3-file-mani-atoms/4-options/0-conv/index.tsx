import { Getter, PrimitiveAtom, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Meta } from "pm-manifest";
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
        uiPart1General: Atomize<UiPart1General>;
        uiPart4QL: Atomize<UiPart4QL>;
        uiPart2ScreenDetection: Atomize<UiPart2ScreenDetection>;
        uiPart3Authentication: Atomize<UiPart3Authentication>;
        uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;

        fileUsAtom: FileUsAtom;
        formIdx: FormIdx;
    };

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

    //

    function newAtomForInput(value: string, onChange: OnValueChangeAny, type: RowInputState['type'] = 'string'): PrimitiveAtom<RowInputState> {
        const state: RowInputState = {
            type,
            data: value,
            initialData: value,
            dirty: false,
            error: undefined,
            touched: undefined,
            validate: undefined,
        };
        return atomWithCallback(state, onChange);
    }

    function newAtomForCheck(value: string, onChange: OnValueChangeAny): PrimitiveAtom<RowInputState> {
        return newAtomForInput(value, onChange, 'boolean');
    }

    export function toAtoms(initialState: OptionsForAtoms, onChange: OnValueChangeAny): FormOptionsAtoms {
        const { uiPart1General, uiPart2ScreenDetection, uiPart3Authentication, uiPart4QL, uiPart5PasswordManagerIcon } = initialState;

        const rv = {
            uiPart1General: {
                nameAtom: atomWithCallback(uiPart1General.name, onChange),
                descAtom: atomWithCallback(uiPart1General.desc, onChange),
                hintAtom: atomWithCallback(uiPart1General.hint, onChange),
                balloonAtom: atomWithCallback(uiPart1General.balloon, onChange),
            },
            uiPart2ScreenDetection: {
                captionAtom: atomWithCallback(uiPart2ScreenDetection.caption, onChange),
                monitorAtom: atomWithCallback(uiPart2ScreenDetection.monitor, onChange),
                urlAtom: atomWithCallback(uiPart2ScreenDetection.url, onChange),
            },
            uiPart3Authentication: {
                aimAtom: atomWithCallback(uiPart3Authentication.aim, onChange),
                lockAtom: atomWithCallback(uiPart3Authentication.lock, onChange),
            },
            uiPart4QL: {
                dashboardAtom: atomWithCallback(uiPart4QL.dashboard, onChange),
                nameAtom: atomWithCallback(uiPart4QL.name, onChange),
                urlAtom: atomWithCallback(uiPart4QL.url, onChange),
            },
            uiPart5PasswordManagerIcon: {
                idAtom: atomWithCallback(uiPart5PasswordManagerIcon.id || '', onChange),
                locAtom: atomWithCallback(uiPart5PasswordManagerIcon.loc || '', onChange),
            },

            fileUsAtom: initialState.fileUsAtom,
            formIdx: initialState.formIdx,
        }
        
        return rv;
    }

    /**/
    export function fromAtoms(atoms: FormOptionsAtoms, get: Getter, set: Setter): OptionsForAtoms {
        const { uiPart1General, uiPart2ScreenDetection, uiPart3Authentication, uiPart4QL, uiPart5PasswordManagerIcon } = atoms;

        const rv: OptionsForAtoms = {
            uiPart1General: {
                name: get(uiPart1General.nameAtom),
                desc: get(uiPart1General.descAtom),
                hint: get(uiPart1General.hintAtom),
                balloon: get(uiPart1General.balloonAtom),
            },
            uiPart2ScreenDetection: {
                caption: get(uiPart2ScreenDetection.captionAtom),
                monitor: get(uiPart2ScreenDetection.monitorAtom),
                url: get(uiPart2ScreenDetection.urlAtom),
            },
            uiPart3Authentication: {
                aim: get(uiPart3Authentication.aimAtom),
                lock: get(uiPart3Authentication.lockAtom),
            },
            uiPart4QL: {
                dashboard: get(uiPart4QL.dashboardAtom),
                name: get(uiPart4QL.nameAtom),
                url: get(uiPart4QL.urlAtom),
            },
            uiPart5PasswordManagerIcon: {
                id: get(uiPart5PasswordManagerIcon.idAtom),
                loc: get(uiPart5PasswordManagerIcon.locAtom),
            },

            fileUsAtom: atoms.fileUsAtom,
            formIdx: atoms.formIdx,
        };

        return rv;
    }
    /**/
    
    //
    /** /
    
    function theSameValue(from: ValueLife, to: ValueLife): boolean {
        const rv = (
            from.value === to.value &&
            from.valueAs === to.valueAs &&
            from.isRef === to.isRef
        );
        return rv;
    }
    /** /
    
    /** /
    export function areTheSame(from: OptionsForAtoms, to: OptionsForAtoms): boolean {
        const rv = (
            from.useIt === to.useIt &&
            from.label === to.label &&
            from.type === to.type &&
            from.dbname === to.dbname &&
            theSameValue(from.valueLife, to.valueLife) &&
            from.valueLife.valueAs === to.valueLife.valueAs
        );
        return rv;
    }
    /**/

}
