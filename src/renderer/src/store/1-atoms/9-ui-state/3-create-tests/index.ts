import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

const localResources = {
    screenNone: "",
    screenA: "tests/25.01.16.25/TopLevelWindowsScreenshots.json",
    screenB: "tests/25.01.16.25/TopLevelWindowsScreenshots2many.json",

    appNone: "",
    win32A: "tests/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}.dpm",
    webB: "tests/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}.dpm",
};

export type LocalResource = keyof typeof localResources;

export const resourceQueryAtom = atomFamily((id: LocalResource) =>
    atom(async () => {
        try {
            const isIdJson = id.endsWith('.json');
            
            const name = localResources[id];
            if (!name) {
                return '';
            }

            const url = `${location.pathname}/${name}`.replaceAll('//', '/'); // "/1.json" (localhost) vs. "/pmat24-lite/1.json" (GitHub)

            const response = await fetch(url).then(
                (res) => {
                    if (isIdJson) {
                        return res.json();
                    } else {
                        return res.text();
                    }
                }
            );
            return response;
        } catch (error) {
            console.error(error);
            return '';
        }
    })
);

// export const resorceScreenAtom = atom<LocalResource>('appNone');
export const resourceScreenContentAtom = atom<string>('');

export const doLoadRsourceScreenContentAtom = atom(
    null,
    async (get, set, data: LocalResource) => {
        // const resource = get(resorceScreenAtom);
        const cnt = await get(resourceQueryAtom(data));

        console.log('doLoadRsourceScreenContent', data, cnt);

        set(resourceScreenContentAtom, cnt);
    }
);
