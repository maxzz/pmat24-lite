import { type FieldRowCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";

export function Case_ManualFieldPolicyBtn({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;
    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
        />
    );
}
