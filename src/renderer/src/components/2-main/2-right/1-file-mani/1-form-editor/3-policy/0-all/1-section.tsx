import { useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx } from '@/store/store-types';
import { Meta } from '@/store/manifest';
import { TableHeader } from './2-table-header';
import { PoliciesGrid } from './3-table-rows';

export function ManiSection3_Policy({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    const policiesAtom = useState(() => atom<Meta.Field[]>([]))[0];
    const [policies, setPolicies] = useAtom(policiesAtom);

    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formIdx];

    useEffect(
        () => {
            const fieldsWPolicy = metaForm?.fields?.filter((field) => field.mani.policy || field.mani.policy2) || []; // and add psw fields that may have policy
            setPolicies(fieldsWPolicy);
        }, [fileUs]
    ); // TODO: we should monitor current form fields and list here all password fields to allow add to them policy

    if (!policies?.length) {
        return <div>Policy not specified</div>;
    }

    return (
        <div className="px-3 py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-1 items-stretch rounded bg-primary-800">
            <TableHeader />
            <PoliciesGrid policies={policies} />
        </div>
    );
}
