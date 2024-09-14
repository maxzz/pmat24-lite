import { atomWithCallback } from '@/util-hooks';
import { type OnChangeValueWithUpdateName, createAtomForCheck, createAtomForInput, validateManifestName, validateNumber } from "@/ui";
import { type ManiOptions } from "./9-types";

export function createAtoms(initialState: ManiOptions.OptionsForAtoms, onChange: OnChangeValueWithUpdateName): ManiOptions.FormOptionsAtoms {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = initialState;

    const rv: ManiOptions.FormOptionsAtoms = {
        p1General: {
            nameAtom: createAtomForInput(p1General.name, onChange('name'), { validate: validateManifestName }),
            descAtom: createAtomForInput(p1General.desc, onChange('desc')),
            hintAtom: createAtomForInput(p1General.hint, onChange('hint')),
            balloonAtom: createAtomForInput(p1General.balloon, onChange('balloon'), { validate: validateNumber }),
            submitTypeAtom: createAtomForInput(p1General.submitType, onChange('submitType')),
            qlNameAtom: createAtomForInput(p1General.qlName, onChange('qlName')),
            qlWoCredAtom: createAtomForCheck(p1General.qlWoCred, onChange('qlWoCred')),
            unkAttrsAtom: createAtomForInput(p1General.unkAttrs, onChange('unkAttrs')),
        },
        p2Detect: {
            captionAtom: createAtomForInput(p2Detect.caption, onChange('caption')),
            monitorAtom: createAtomForCheck(p2Detect.monitor, onChange('monitor')),
            ourlAtom: createAtomForInput(p2Detect.ourl, onChange('ourl')),
            murlAtom: createAtomForInput(p2Detect.murl, onChange('murl')),

            dlg_tabAtom: createAtomForInput(p2Detect.dlg_tab, onChange('dlg_tab')),
            dlg_classAtom: createAtomForInput(p2Detect.dlg_class, onChange('dlg_class')),
            dlg_checkexeAtom: createAtomForCheck(p2Detect.dlg_checkexe, onChange('dlg_checkexe')),

            emu_patternAtom: createAtomForInput(p2Detect.emu_pattern, onChange('emu_pattern')),
            namesAtom: createAtomForInput(p2Detect.names, onChange('names')),
            names_extAtom: createAtomForInput(p2Detect.names_ext, onChange('names_ext')),
            processnameAtom: createAtomForInput(p2Detect.processname, onChange('processname')),
            commandlineAtom: createAtomForInput(p2Detect.commandline, onChange('commandline')),

            reCheckAtom: createAtomForCheck(p2Detect.reCheck, onChange('recheckwindowafterfillin')),
        },
        p3Auth: {
            aimAtom: createAtomForCheck(p3Auth.aim, onChange('aim')),
            lockAtom: createAtomForCheck(p3Auth.lock, onChange('lock')),
            auth_plAtom: createAtomForInput(p3Auth.auth_pl, onChange('auth_pl')),
        },
        p4QL: {
            dashboardAtom: createAtomForCheck(p4QL.dashboard, onChange('dashboard')),
            qNameAtom: createAtomForInput(p4QL.qName, onChange('name')),
            qUrlAtom: createAtomForInput(p4QL.qUrl, onChange('url')),
            qUseAtom: createAtomForCheck(p4QL.qUse, onChange('use')),
        },
        p5Icon: {
            idAtom: createAtomForInput(p5Icon.id, onChange('id')),
            locAtom: createAtomForInput(p5Icon.loc, onChange('loc')),
        },

        isWebAtom: atomWithCallback(initialState.isWeb, onChange('isWeb')),
        formIdx: initialState.formIdx,
    };

    return rv;
}
