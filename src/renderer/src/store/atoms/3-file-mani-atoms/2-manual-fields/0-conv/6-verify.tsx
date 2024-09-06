import { type Getter, type Setter } from "jotai";
import { type MFormCtx, type VerifyError } from "../../9-types";
import { FormIdx } from "@/store/store-types";
import { getAllValidateAtoms, type RowInputStateUuid } from "./6-verify-state-access";

export function getFormVerifyErrors(ctx: MFormCtx, formIdx: FormIdx, get: Getter, set: Setter): VerifyError[] {

    const chunks = get(ctx.chunksAtom);

    const toValidate: RowInputStateUuid[] = getAllValidateAtoms(chunks, get);

    const tab = formIdx === FormIdx.login ? 'login' : 'cpass';

    const rv: VerifyError[] = Object.entries(toValidate)
        .map(
            ([key, item]) => {
                const atomValue: RowInputStateUuid = item;
                const actionUuid = atomValue.uuid;
                const error = atomValue.validate?.(atomValue.data);

                const rv: VerifyError | undefined = error ? { error, tab, actionUuid } : undefined;
                return rv;
            }
        ).filter(Boolean);

    return rv;
}
