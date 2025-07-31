import { type ManiTabValue, type VerifyError } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { type RowInputState, type RowInputStateAtoms } from "./9-types";

export function validateRowInputStateAtoms(toValidate: RowInputStateAtoms, maniTabValue: ManiTabValue, { get, set }: GetSet): VerifyError[] {
    const rv: VerifyError[] =
        Object.entries(toValidate)
            .map(
                ([key, atom]) => {
                    const atomValue: RowInputState = get(atom);
                    const error = atomValue.validate?.(atomValue.data);
                    if (error) {
                        set(atom, (v) => ({ ...v, error, touched: true }));
                    }
                    const rv: VerifyError | undefined =
                        error
                            ? {
                                error: error,
                                tab: maniTabValue,
                            }
                            : undefined;
                    return rv;
                }
            )
            .filter(Boolean);
    return rv;
}
