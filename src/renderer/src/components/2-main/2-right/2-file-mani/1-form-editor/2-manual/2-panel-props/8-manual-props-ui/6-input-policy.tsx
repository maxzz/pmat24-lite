import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputLabel } from "./1-input-label";
import { Column6_Policy } from "../../../1-normal/1-fields/6-column-policy";
import { useAtomValue } from "jotai";
import { FieldTyp } from "pm-manifest";

export function ManualFieldPolicy({ item }: { item: ManualFieldState.FldForAtoms; }) {

    const { useItAtom, typeAtom, policiesAtom } = item.rowAtoms;

    const isPassword = useAtomValue(typeAtom) === FieldTyp.psw;
    if (!isPassword) {
        return null;
    }

    return (
        <InputLabel label="Policy">
            <Column6_Policy
                useItAtom={useItAtom}
                typeAtom={typeAtom}
                policiesAtom={policiesAtom}
            />
        </InputLabel>
    );
}

//TODO: Policy button if field password
