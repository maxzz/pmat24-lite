import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { prependUrlPath } from "@/utils";

const localResources = {
    screenNone: "",
    screenA: "tests/25.01.16.25/TopLevelWindowsScreenshots.json",
    screenB: "tests/25.01.16.25/TopLevelWindowsScreenshots2many.json",

    appNone: "",
    win32A: "tests/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}.dpm",
    webB: "tests/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}.dpm",
};

export type LocalResource = keyof typeof localResources;

const hashedResQueryAtom = atomFamily(
    (id: LocalResource) => atom(
        async () => {
            try {
                const name = localResources[id];
                if (!name) {
                    return '';
                }

                const isIdJson = name.endsWith('.json');

                const url = prependUrlPath(name);

                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${url}`);
                }

                const response = isIdJson ? await res.json() : await res.text();
                return response;
            } catch (error) {
                console.error(error);
                return '';
            }
        }
    )
);

// export const resorceScreenAtom = atom<LocalResource>('appNone');
export const resourceScreenContentAtom = atom<string>('');

export const doLoadFakeScreenshotsAtom = atom(
    null,
    async (get, set, data: LocalResource) => {
        // const resource = get(resorceScreenAtom);
        const cnt = await get(hashedResQueryAtom(data));

        console.log('doLoadRsourceScreenContent', data, cnt);

        set(resourceScreenContentAtom, cnt);
    }
);
