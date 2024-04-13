import { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { FileUs, FormIdx } from '@/store/store-types';
import { Meta } from '@/store/manifest';
import { createUiAtoms, debouncedCombinedResultFromAtoms } from './0-create-ui-atoms';
import { TableHeader } from './2-table-header';
import { PoliciesGrid } from './3-table-grid';
import { Button, notImplYet } from '@/ui';

export function ManiSection3_Policy({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const policiesAtom = useState(() => atom<Meta.Field[]>([]))[0];
    const [policies, setPolicies] = useAtom(policiesAtom);

    const metaForm = fileUs.meta?.[formIdx];

    const atoms = useState(
        () => createUiAtoms(metaForm,
            ({ get, set }) => {
                debouncedCombinedResultFromAtoms(atoms, get, set);
            }
        )
    )[0]; //TODO: not used yet

    useEffect(
        () => {
            const fieldsWPolicy = metaForm?.fields?.filter((field) => field.mani.policy || field.mani.policy2) || []; // and add psw fields that may have policy
            setPolicies(fieldsWPolicy);
        }, [fileUs]
    ); // TODO: we should monitor current form fields and list here all password fields to allow add to them policy

    if (!policies?.length) {
        return (
            <div className="px-5 pt-1 pb-4 flex items-center gap-2">
                <div className="">
                    No policy specified.
                </div>

                <Button size="sm" {...notImplYet}>Create policy</Button>
            </div>
        );
    }

    return (
        <div className="px-1 py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-1 items-stretch rounded">
            <TableHeader />
            <PoliciesGrid policies={policies} />
        </div>
    );
}

//TODO: for multiple password fields we need to select field to which policy will be applied
