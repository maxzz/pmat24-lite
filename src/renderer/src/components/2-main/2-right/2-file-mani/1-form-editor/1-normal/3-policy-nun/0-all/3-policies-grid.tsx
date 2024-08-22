import { PolicyItem } from './4-policy-row';
import { PolicyState } from '@/store/atoms/3-file-mani-atoms';

export function PoliciesGrid({ policies }: { policies: PolicyState.Atoms[]; }) {
    return (<>
        {policies.map(
            (policy, idx) => (
                <PolicyItem policyAtoms={policy} key={idx} />
            )
        )}
    </>);
}
