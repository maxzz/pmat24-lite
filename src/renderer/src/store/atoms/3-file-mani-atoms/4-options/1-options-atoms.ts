import { Getter, PrimitiveAtom, Setter } from "jotai";
import { OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { OptionsConv } from "./0-conv";
import { RowInputState } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls";

export namespace OptionsState {

    export type Atoms = OptionsConv.FormOptionsAtoms;

    function newAtomForInput(value: string, onChange: OnValueChangeAny): PrimitiveAtom<RowInputState> {
        const state: RowInputState = {
            type: 'string',
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
        const state: RowInputState = {
            type: 'boolean',
            data: value,
            initialData: value,
            dirty: false,
            error: undefined,
            touched: undefined,
            validate: undefined,
        };
        return atomWithCallback(state, onChange);
    }

    export function createAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;
        
        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const detection = fileUs.mani?.forms?.[formIdx]?.detection || {};
        const options = fileUs.mani?.forms?.[formIdx]?.options || {};

        const onChange = ({ get, set }) => {
            debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, get, set);
        }

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

    export function combineOptionsFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, get: Getter, set: Setter) {
        const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.optionsAtoms;

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
