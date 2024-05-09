import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { FieldsState } from "../1-fields";
import { SubmitState } from "../2-submit";
import { PolicyState } from "../3-policy";
import { OptionsState } from "../4-options";
import { proxySet } from "valtio/utils";

export type ChangesSet = Set<string>;

export type CreateAtomsParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

export type FormAtoms = {
    fieldsAtoms: FieldsState.Atoms[];
    submitAtoms: SubmitState.Atoms;
    policyAtoms: PolicyState.Atoms[];
    optionsAtoms: OptionsState.Atoms;

    params: CreateAtomsParams;
};

export type ManiAtoms = readonly [login: FormAtoms | undefined, cpass: FormAtoms | undefined];

//

export type TabSectionProps = {
    maniAtoms: ManiAtoms;
    formAtoms: FormAtoms;
    formIdx: FormIdx;
};

// fileUs changes

export function setManiChanges(createAtomsParams: CreateAtomsParams, changed: boolean, changeName: string): ChangesSet {
    
    const fileUs = createAtomsParams.fileUs;
    
    const changes = fileUs.changesSet;
    changes[changed ? 'add' : 'delete'](changeName);

    allFileUsChanges[changes.size ? 'add' : 'delete'](`${fileUs.id}`);

    return changes;
}

// all files changes

export const allFileUsChanges = proxySet<string>();