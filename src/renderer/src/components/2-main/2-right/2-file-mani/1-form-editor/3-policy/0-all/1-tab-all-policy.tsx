import { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { Meta } from "@/store/manifest";
import { PolicyState, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { TableHeader } from "./2-table-header";
import { PoliciesGrid } from "./3-table-grid";
import { NoPasswordsForPolies } from "./9-no-polies";

function PolicyItem({ policyAtoms }: { policyAtoms: PolicyState.Atoms; }) {
    const { policyAtom, policy2Atom, policyTextAtom } = policyAtoms;

    const policy = useAtomValue(policyAtom);
    const policy2 = useAtomValue(policy2Atom);
    const policyText = useAtomValue(policyTextAtom);

    return (
        <div className="flex items-center">
            <div className="flex-1">{policyAtoms.maniField.displayname || 'no name field'}</div>
            <div className="flex-1">{policy}</div>
            <div className="flex-1">{policy2}</div>
        </div>
    );
}

export function TabPolicy({ formAtoms, formIdx }: TabSectionProps) {

    const policies = formAtoms.policyAtoms;
    if (!policies.length) {
        return (
            <NoPasswordsForPolies />
        );
    }

    // const policiesAtom = useState(() => atom<Meta.Field[]>([]))[0];
    // const [policies, setPolicies] = useAtom(policiesAtom);

    // const fileUs = formAtoms.params.fileUs;
    // const metaForm = formAtoms.params.fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

    // useEffect(
    //     () => {
    //         const fieldsWPolicy = metaForm?.fields?.filter((field) => field.mani.policy || field.mani.policy2) || []; // and add psw fields that may have policy
    //         setPolicies(fieldsWPolicy);
    //     }, [fileUs]
    // );

    return (
        <div className="ml-1">
            <div className="pl-3 pr-2 py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-1 items-stretch rounded">
                <TableHeader />
                
                {policies.map(
                    (policy, idx) => (
                        <PolicyItem key={idx} policyAtoms={policy} />
                    )
                )}

                {/* <PoliciesGrid policies={policies} /> */}
            </div>
        </div>
    );
}

//TODO: for multiple password fields we need to select field to which policy will be applied
//TODO: we should monitor current form fields and list here all password fields to allow add to them policy
