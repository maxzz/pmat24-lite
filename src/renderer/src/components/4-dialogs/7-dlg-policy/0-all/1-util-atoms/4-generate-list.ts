import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { generatePswByRules, verifyPassword } from "@/store/manifest/3-policy-io";
import { appSettings } from "@/store";

export type GenerateListItem = {
    ok: boolean;
    psw: string;
};

const _generateListAtom = atom<GenerateListItem[]>([]);

export const generateListAtom = atom(
    (get) => get(_generateListAtom),
    (get, set, { dlgUiAtoms }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; }) => {
        const { parser, customAtom } = dlgUiAtoms;

        const custom = get(customAtom);
        if (!custom) {
            set(_generateListAtom, []);
            return;
        }

        const prevPsw = '';
        const arr: GenerateListItem[] = [];

        const nToGenerate = appSettings.right.mani.nToGenerate;
        let total = !nToGenerate || isNaN(nToGenerate) ? 50 : nToGenerate;

        for (let i = 0; i < total; i++) {
            const psw = generatePswByRules(parser.rulesAndMeta, parser.rulesAndMeta.noRepeat, '');
            const ok = verifyPassword(parser.rulesAndMeta, prevPsw, psw, parser.rulesAndMeta.noRepeat);
            arr.push({ ok, psw });
        }

        set(_generateListAtom, arr);
    }
);
