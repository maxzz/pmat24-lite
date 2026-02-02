import { atom } from "jotai";
import { type RowInputStateAtom } from "@/ui/local-ui";
import { type FileUsAtom } from "@/store/store-types";
import { getManiDispNameAtomAtom } from "@/store/2-file-mani-atoms/3-options/2-conv-options";
import { FormIdx } from "@/store/8-manifest";

export type ManiNameDlgData = {
    fileUsAtom: FileUsAtom;             // fileUs to rename
    nameAtom: RowInputStateAtom;        // new name
    startName: string;                  // name when dialog was opened to restore on cancel
    defaultName: string | undefined;    // default name to show in the dialog
    resolve: (ok: boolean) => void;     // ok or cancel
};

const _maniNameDlgDataAtom = atom<ManiNameDlgData | undefined>(undefined); // TODO: show only if name is invalid

export const maniNameDlgDataAtom = atom((get) => get(_maniNameDlgDataAtom));

export const maniNameDlgCloseAtom = atom(
    null,
    (get, set, ok: boolean) => {
        const data = get(_maniNameDlgDataAtom);
        if (!data) {
            return;
        }

        set(_maniNameDlgDataAtom, undefined);
        data.resolve(ok);
    }
);

export const doManiNameDlgAtom = atom(
    null,
    async (get, set, { fileUsAtom, provideDefaultName }: { fileUsAtom: FileUsAtom; provideDefaultName: boolean; }): Promise<boolean> => {
        if (!fileUsAtom) {
            return false;
        }

        const nameAtom = set(getManiDispNameAtomAtom, fileUsAtom);
        if (!nameAtom) {
            return false;
        }

        const defaultName = provideDefaultName ? getDefaultName(fileUsAtom, get) : undefined;

        const data: Omit<ManiNameDlgData, 'resolve'> = {
            fileUsAtom,
            nameAtom,
            defaultName,
            startName: get(nameAtom).data,
        };

        const resolveName = new Promise<boolean>((resolve) => {
            set(_maniNameDlgDataAtom, { ...data, resolve, });
        });

        const ok = await resolveName;

        if (!ok) {
            set(data.nameAtom, (v) => ({ ...v, data: data.startName, error: undefined, touched: false, dirty: false }));
        }

        return ok;
    }
);

function getDefaultName(fileUsAtom: FileUsAtom, get: Getter): string | undefined {
    const fileUs = get(fileUsAtom);
    if (!fileUs?.maniAtomsAtom) {
        return;
    }

    const maniAtoms = get(fileUs.maniAtomsAtom);
    return;

    // isWeb
    // const nameAtom = maniAtoms?.[FormIdx.login]?.options.p1General.;
    
    // return nameAtom ? get(nameAtom).data : undefined;
}
