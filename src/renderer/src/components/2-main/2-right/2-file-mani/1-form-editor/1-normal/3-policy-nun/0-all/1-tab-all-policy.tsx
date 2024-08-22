import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { TableHeader } from "./2-grid-header";
import { PoliciesGrid } from "./3-policies-grid";
import { NoPasswordsForPolies } from "./9-no-polies";

export function TabPolicy({ formAtoms }: TabSectionProps) {

    const policies = formAtoms.policyAtoms;
    if (!policies.length) {
        return (
            <NoPasswordsForPolies />
        );
    }

    return (
        <div className="ml-1">
            <div className="pl-3 pr-2 py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-1 items-stretch rounded">
                <TableHeader />
                <PoliciesGrid policies={policies} />
            </div>
        </div>
    );
}

//TODO: for multiple password fields we need to select field to which policy will be applied
//TODO: we should monitor current form fields and list here all password fields to allow add to them policy
