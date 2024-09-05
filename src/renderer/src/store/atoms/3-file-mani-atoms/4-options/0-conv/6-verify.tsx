import { type PrimitiveAtom, type Getter, type Setter } from "jotai";
import { type ManiOptions } from "./9-types";
import { type RowInputState } from "@/ui";
import { FormIdx } from "@/store/store-types";

export function verifyAtoms(atoms: ManiOptions.FormOptionsAtoms, formIdx: FormIdx, get: Getter, set: Setter): string[] {
    const { p1General, p2Detect, p3Auth, p4QL, p5Icon } = atoms;

    const toValidate: Record<string, PrimitiveAtom<RowInputState>> =
        formIdx === FormIdx.login
            ? { ...p1General, ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon }
            : { ...p2Detect, ...p3Auth, ...p4QL, ...p5Icon };

    const rv: string[] = Object.entries(toValidate)
        .map(
            ([key, atom]): string | undefined => {
                const atomValue = get(atom);
                const error = atomValue.validate?.(atomValue.data);
                return error;
            }
        ).filter(Boolean);

    return rv;
}
