import { type Mani, type Meta } from "@/store/manifest";

export type ByUuid = {
    [uuid: string]: {
        meta: Meta.Field,
        newMani: Mani.Field | undefined,
    };
};
