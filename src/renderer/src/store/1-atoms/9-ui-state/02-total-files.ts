import { proxy } from "valtio";

export type TotalManis = {
    manual: number;         // manual mode manifests
    normal: number;         // normal mode manifests
    empty: number;          // empty manifests
    fc: number;             // field catalogs
};

export const totalManis = proxy<TotalManis>({ // total manifests
    manual: 0,
    normal: 0,
    empty: 0,
    fc: 0,
});
