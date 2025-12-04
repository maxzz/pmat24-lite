import { type Mani, type Meta } from "@/store/8-manifest";

export type OldNewField = {
    meta: Meta.Field,
    newMani: Mani.Field | undefined,
};

export type RecordOldNewFieldByUuid = {
    [uuid: string]: OldNewField;
};
