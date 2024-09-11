import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FileMani } from "@/store/manifest";
import { type NormalField, type NormalFieldsState, NormalFieldConv, SubmitConv } from "../../../1-normal-fields";
import { ManiConv } from "./1-normal/2-conv-mani";
import { OptionsConv } from "../../../4-options";
import { type DAOForMani, detectionAndOptionsForMani } from "./3-options/53-conv-mani-options";

function filterEmptyValues<T extends Record<string, any>>(obj: T): T | undefined {
    const entries = Object
        .entries(obj)
        .filter(([key, value]) => !!value);
    return entries.length ? Object.fromEntries(entries) as T : undefined;
}

export function packManifestData(get: Getter, set: Setter, fileUs: FileUs, fileUsAtom: FileUsAtom, newFilename?: string) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return;
    }

    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    if (loginFormAtoms) {

        if (loginFormAtoms.normal) {
            // 1. Submits

            const submits = SubmitConv.fromAtoms(loginFormAtoms.normal.submitAtoms, get, set);
            console.log('submits', JSON.stringify(submits, null, 2));

            // 2. Fields

            const fields = loginFormAtoms.normal.fieldsAtoms.map(
                (fieldAtoms: NormalFieldsState.Atoms) => {
                    const metaField = fieldAtoms.metaField;

                    const fromAtomValues: NormalField.ForAtoms = NormalFieldConv.fromAtoms(fieldAtoms, get, set);
                    const maniValues: NormalField.ThisType = NormalFieldConv.forMani(fromAtomValues);
                    const fileValues: FileMani.Field = ManiConv.fieldForFileMani({
                        from: maniValues,
                        maniField: metaField.mani,
                        ftyp: metaField.ftyp,
                        rdir: undefined,
                        isSubmit: false,
                    });
                    return fileValues;
                }
            );
            // console.log('maniValues', JSON.stringify(fields, null, 2));
        }

        // 3. Options

        const detectionAndOptionsRow = OptionsConv.fromAtoms(loginFormAtoms.options, get, set);

        const { detection, options } = detectionAndOptionsForMani(detectionAndOptionsRow);

        const detectionFiltered = filterEmptyValues(detection);
        const optionsFiltered = filterEmptyValues(options);

        const detectionAndOptions: Partial<DAOForMani> = {
            ...(detectionFiltered && { detection: detectionFiltered }),
            ...(optionsFiltered && { options: optionsFiltered }),
        };

        const optionStr = JSON
            .stringify(detectionAndOptions, null, 2)
            .replace(/"names_ext":\s".*",/, '"names_ext": "...",');
        console.log('options', optionStr);

        // 4. The rest

    }
}
