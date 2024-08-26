import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { NormalFieldConv } from "../../1-fields/1-normal-field-atoms/0-conv";
import { ManiConv } from "./2-conv-mani";
import { SubmitConv } from "../../2-submit/0-conv";
import { OptionsConv } from "../../4-options";
import { type DAOForMani, detectionAndOptionsForMani } from "./53-conv-mani-options";

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
                (fieldAtoms) => {
                    const metaField = fieldAtoms.metaField;

                    const fromAtomValues = NormalFieldConv.fromAtoms(fieldAtoms, get, set);
                    const maniValues = NormalFieldConv.forMani(fromAtomValues);
                    const fileValues = ManiConv.fieldForFileMani(maniValues, fieldAtoms.metaField, undefined, false);
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
