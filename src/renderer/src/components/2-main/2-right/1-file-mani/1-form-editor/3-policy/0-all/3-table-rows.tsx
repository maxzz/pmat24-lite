import { Meta } from '@/store/manifest';
import { FieldWithPolicyRow } from './4-table-row';

export function PoliciesGrid({ policies }: { policies: Meta.Field[]; }) {
    return (<>
        {policies.map(
            (field, idx) => (
                <FieldWithPolicyRow field={field} key={idx} />
            ))
        }
    </>);
}
