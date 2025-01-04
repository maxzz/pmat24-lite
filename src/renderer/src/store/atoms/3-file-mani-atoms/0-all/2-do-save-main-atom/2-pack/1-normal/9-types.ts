import { type Mani, type Meta } from "@/store/manifest";

export type MapByUuid = {
    [uuid: string]: {
        meta: Meta.Field,
        newMani: Mani.Field | undefined,
    };
};
