import { prependUrlPath } from "@/utils";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const hashedResQueryAtom = atomFamily(
    (fname: string) => atom(
        async () => {
            try {
                if (!fname) {
                    return '';
                }

                const isIdJson = fname.endsWith('.json');
                const url = prependUrlPath(fname);
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Failed to fetch ${url}`);
                }

                const rv = isIdJson ? await res.json() : await res.text();
                return rv;
            } catch (error) {
                console.error(error);
                return '';
            }
        }
    )
);
