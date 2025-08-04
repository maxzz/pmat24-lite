import { atom } from "jotai";
import { aboutMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { doGetGeneralInfoAtom } from "@/store/7-napi-atoms";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const rv = await set(doGetGeneralInfoAtom);

        const message = (
            <div className="text-xs">
                <div className="font-semibold whitespace-pre">
                    {JSON.stringify(JSON.parse(rv), null, 4)}
                </div>
            </div>
        );

        const ui = { ...aboutMessages, message };
        await set(doAsyncConfirmDialogAtom, ui);
    }
);
