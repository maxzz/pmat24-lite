import { atomWithCallback } from '@/util-hooks';
import { type OnChangeValueWithPpdateName, newAtomForCheck, newAtomForInput, validateManifestName, validateNumber } from "@/ui";
import { type ManiOptions } from "./9-types";

export function createAtoms(initialState: ManiOptions.OptionsForAtoms, onChange: OnChangeValueWithPpdateName): ManiOptions.FormOptionsAtoms {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = initialState;

    const rv: ManiOptions.FormOptionsAtoms = {
        p1General: {
            nameAtom: newAtomForInput(p1General.name, onChange('name'), { validate: validateManifestName }),
            descAtom: newAtomForInput(p1General.desc, onChange('desc')),
            hintAtom: newAtomForInput(p1General.hint, onChange('hint')),
            balloonAtom: newAtomForInput(p1General.balloon, onChange('balloon'), { validate: validateNumber }),
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
