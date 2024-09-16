import { type FormIdx } from "../manifest";
import { type FileUsAtom } from "./0-file-us-type";

export type FileUsFormData = {
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};
