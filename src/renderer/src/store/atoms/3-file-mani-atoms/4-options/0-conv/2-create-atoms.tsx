import { type Getter, type Setter } from 'jotai';
import { atomWithCallback } from '@/util-hooks';
import { type OnChangeValueWithUpdateName, createAtomForCheck, createAtomForInput, validateManifestName, validateNumber } from "@/ui";
import { type FormOptionsState } from "./9-types";

export function createAtoms(initialState: FormOptionsState.ForAtoms, onChange: OnChangeValueWithUpdateName): FormOptionsState.AllAtoms {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = initialState;

    const rv: FormOptionsState.AllAtoms = {
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
            variablecaptionAtom: createAtomForInput(p2Detect.variablecaption, onChange('variablecaption')),
            monitorAtom: createAtomForCheck(p2Detect.monitor, onChange('monitor')),
            ourlAtom: createAtomForInput(p2Detect.ourl, onChange('ourl')),
            murlAtom: createAtomForInput(p2Detect.murl, onChange('murl')),
            webCheckUrlAtom: createAtomForCheck(p2Detect.webCheckUrl, onChange('web_checkurl')),

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
            qNameAtom: createAtomForInput(p4QL.qName, onChange('name')),
            qUrlAtom: createAtomForInput(p4QL.qUrl, onChange('url')),
            qUseAtom: createAtomForCheck(p4QL.qUse, onChange('use')),
        },
        p5Icon: {
            idAtom: createAtomForInput(p5Icon.id, onChange('id')),
            locAtom: createAtomForInput(p5Icon.loc, onChange('loc')),
        },

        isWebAtom: atomWithCallback(initialState.isFormWeb, onChange('isWeb')),
        formIdx: initialState.formIdx,
    };

    return rv;
}

export function valuesToAtoms(values: FormOptionsState.ForAtoms, atoms: FormOptionsState.AllAtoms, get: Getter, set: Setter) {
    set(atoms.p1General.nameAtom, (v) => ({ ...v, data: values.p1General.name }));
    set(atoms.p1General.descAtom, (v) => ({ ...v, data: values.p1General.desc }));
    set(atoms.p1General.hintAtom, (v) => ({ ...v, data: values.p1General.hint }));
    set(atoms.p1General.balloonAtom, (v) => ({ ...v, data: values.p1General.balloon }));
    set(atoms.p1General.submitTypeAtom, (v) => ({ ...v, data: values.p1General.submitType }));
    set(atoms.p1General.qlNameAtom, (v) => ({ ...v, data: values.p1General.qlName }));
    set(atoms.p1General.qlWoCredAtom, (v) => ({ ...v, data: boo(values.p1General.qlWoCred) }));
    set(atoms.p1General.unkAttrsAtom, (v) => ({ ...v, data: values.p1General.unkAttrs }));

    set(atoms.p2Detect.captionAtom, (v) => ({ ...v, data: values.p2Detect.caption }));
    set(atoms.p2Detect.monitorAtom, (v) => ({ ...v, data: boo(values.p2Detect.monitor) }));
    set(atoms.p2Detect.ourlAtom, (v) => ({ ...v, data: values.p2Detect.ourl }));
    set(atoms.p2Detect.murlAtom, (v) => ({ ...v, data: values.p2Detect.murl }));

    set(atoms.p2Detect.dlg_tabAtom, (v) => ({ ...v, data: values.p2Detect.dlg_tab }));
    set(atoms.p2Detect.dlg_classAtom, (v) => ({ ...v, data: values.p2Detect.dlg_class }));
    set(atoms.p2Detect.dlg_checkexeAtom, (v) => ({ ...v, data: boo(values.p2Detect.dlg_checkexe) }));

    set(atoms.p2Detect.emu_patternAtom, (v) => ({ ...v, data: values.p2Detect.emu_pattern }));
    set(atoms.p2Detect.namesAtom, (v) => ({ ...v, data: values.p2Detect.names }));
    set(atoms.p2Detect.names_extAtom, (v) => ({ ...v, data: values.p2Detect.names_ext }));
    set(atoms.p2Detect.processnameAtom, (v) => ({ ...v, data: values.p2Detect.processname }));
    set(atoms.p2Detect.commandlineAtom, (v) => ({ ...v, data: values.p2Detect.commandline }));

    set(atoms.p2Detect.reCheckAtom, (v) => ({ ...v, data: boo(values.p2Detect.reCheck) }));

    set(atoms.p3Auth.aimAtom, (v) => ({ ...v, data: boo(values.p3Auth.aim) }));
    set(atoms.p3Auth.lockAtom, (v) => ({ ...v, data: boo(values.p3Auth.lock) }));
    set(atoms.p3Auth.auth_plAtom, (v) => ({ ...v, data: values.p3Auth.auth_pl }));

    set(atoms.p4QL.qNameAtom, (v) => ({ ...v, data: values.p4QL.qName }));
    set(atoms.p4QL.qUrlAtom, (v) => ({ ...v, data: values.p4QL.qUrl }));
    set(atoms.p4QL.qUseAtom, (v) => ({ ...v, data: boo(values.p4QL.qUse) }));

    set(atoms.p5Icon.idAtom, (v) => ({ ...v, data: values.p5Icon.id }));
    set(atoms.p5Icon.locAtom, (v) => ({ ...v, data: values.p5Icon.loc }));
}

function boo(value: boolean): string {
    return value ? '1' : '';
}
