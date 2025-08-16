import { type Mani, type Meta } from "@/store/manifest";

export type OldNewField = {
    meta: Meta.Field,
    newMani: Mani.Field | undefined,
};

export type RecordOldNewFieldByUuid = {
    [uuid: string]: OldNewField;
};
