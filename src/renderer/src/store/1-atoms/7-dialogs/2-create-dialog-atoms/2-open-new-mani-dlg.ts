import { type Setter, atom } from "jotai";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { newManiContent } from "../../2-file-mani-atoms";
import { appSettings } from "../../9-ui-state";

export const dataToOpen_NewManiDlgAtom = atom((get) => get(_isDlgOpenAtom));
export const open_NewManiDlgAtom = atom(() => null, (get, set, openManiDlgData: NewManiDlgData) => set(doOpenDlgNewManiSawAtom, openManiDlgData));
export const close_NewManiDlgAtom = atom(() => null, (get, set) => set(doOpenDlgNewManiSawAtom, undefined));

export type NewManiDlgData = {
    resolve: (ok: boolean) => void;             // ok or cancel
};

const doOpenDlgNewManiSawAtom = atom(
    (get) => null,
    (get, set, open: NewManiDlgData | undefined) => {
        if (open) {
            if (newManiContent.maniForCpassAtom) { // cpass dialog is embedded, so don't open dialog
                return;
            }

            const { noNewManiDlg } = appSettings.appUi.uiAdvanced;
        } else {
            // const currentFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
            // set(newManiContent.newFileUsAtomAtom, undefined);

            // set(doDisposeFileUsAtomAtom, currentFileUsAtomAtom); // The previuos operation will clean up the fileUsAtom if it was saved otherwise it will be undefined.
        }

        set(_isDlgOpenAtom, open);
    }
);

const _isDlgOpenAtom = atom<NewManiDlgData | undefined>(undefined);

export async function asyncExecuteNewManiDlg(set: Setter): Promise<boolean> {
    const resolveDlg = new Promise<boolean>((resolve) => { set(open_NewManiDlgAtom, { resolve, }); });
    const ok = await resolveDlg;
    return ok;
}
