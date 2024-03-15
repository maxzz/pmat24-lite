import { FileUsAtomType } from "./0-file-us-type";

export const enum FormIdx {
    login = 0,// 0 - login (even if login does not exist)
    cpass

}

export type FileUsFormData = {
    fileUsAtom: FileUsAtomType;
    formIdx: FormIdx;
};
