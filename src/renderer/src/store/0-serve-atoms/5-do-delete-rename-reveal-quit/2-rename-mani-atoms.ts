import { atom } from "jotai";
import { type RowInputStateAtom } from "@/ui/local-ui";
import { type FileUsAtom } from "@/store/store-types";
import { getManiDispNameAtomAtom } from "@/store/2-file-mani-atoms/3-options/2-conv-options";
import { FormIdx, urlDomain } from "@/store/8-manifest";

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

        if (defaultName) {
            set(nameAtom, (v) => ({ ...v, data: defaultName, error: undefined, touched: false, dirty: false }));
        }

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
    const options = maniAtoms?.[FormIdx.login]?.options;
    if (!options) {
        return;
    }

    const { p2Detect, isWebAtom } = options;

    if (get(isWebAtom)) {
        const ourl = get(p2Detect.ourlAtom).data;
        if (ourl) {
            const domain = urlDomain(ourl);
            return domain;
        }
        return;
    } else {
        const processname = get(p2Detect.processnameAtom).data;
        if (processname) {
            return getFromProcessNameNameWithoutExtensionAndPath(processname);
        }
    }

    return;
}

function getFromProcessNameNameWithoutExtensionAndPath(processname: string): string | undefined {
    // Example: "C:\Program Files\Internet Explorer\iexplore.exe" -> "iexplore"
    const name = processname.split('.').shift()?.split(/[\\\/]/).pop();
    return name;
}
