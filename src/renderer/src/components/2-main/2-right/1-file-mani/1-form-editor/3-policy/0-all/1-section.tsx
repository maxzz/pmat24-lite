import { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { FileUs, FormIdx } from '@/store/store-types';
import { Meta } from '@/store/manifest';
import { TableHeader } from './2-table-header';
import { PoliciesGrid } from './3-table-grid';
import { Button } from '@/ui';
import { notImplYet } from '@/components/1-header';

export function ManiSection3_Policy({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const policiesAtom = useState(() => atom<Meta.Field[]>([]))[0];
    const [policies, setPolicies] = useAtom(policiesAtom);

    const metaForm = fileUs.meta?.[formIdx];

    useEffect(
        () => {
            const fieldsWPolicy = metaForm?.fields?.filter((field) => field.mani.policy || field.mani.policy2) || []; // and add psw fields that may have policy
            setPolicies(fieldsWPolicy);
        }, [fileUs]
    ); // TODO: we should monitor current form fields and list here all password fields to allow add to them policy

    if (!policies?.length) {
        return (
            <div className="px-2 pt-1 pb-4 flex items-center gap-2">
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
