import { FileUsAtom } from "./0-file-us-type";

export const enum FormIdx {
    login = 0,// 0 - login (even if login does not exist)
    cpass

}

export const enum OptionsGroup {
    login = 0,
    cpass,
    header,
}

export type FileUsFormData = {
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};
