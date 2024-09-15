import { type Getter, type Setter } from "jotai";
import { type ManiOptions } from "./9-types";

export function fromAtoms(atoms: ManiOptions.FormOptionsAtoms, get: Getter, set: Setter): ManiOptions.OptionsForAtoms {
    const { p1General: p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

    const rv: ManiOptions.OptionsForAtoms = {
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
            ourl: get(p2Detect.ourlAtom).data,
            murl: get(p2Detect.murlAtom).data,

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

        isFormWeb: get(atoms.isWebAtom),
        formIdx: atoms.formIdx,
    };

    return rv;
}
