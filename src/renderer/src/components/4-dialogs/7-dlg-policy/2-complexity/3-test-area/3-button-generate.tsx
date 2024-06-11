import { useSetAtom } from "jotai";
import { PolicyDlgConv, generateAtom } from "../../0-all";
import { Button } from "@/ui";

const localButtonClasses = "active:scale-[.97]";

export function ButtonGenerate({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const doGenerate = useSetAtom(generateAtom);
    return (
        <Button className={localButtonClasses} variant="outline" size="sm" title="Generate test password"
            onClick={() => {
                doGenerate({ dlgUiAtoms, prevPsw: '' });
            }}
        >
            Generate
        </Button>
    );
}
