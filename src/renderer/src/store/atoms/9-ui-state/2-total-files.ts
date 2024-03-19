import { proxy } from "valtio";

export const totalManis = proxy({ // total manifests
    manual: 0,
    normal: 0,
    empty: 0,
});
