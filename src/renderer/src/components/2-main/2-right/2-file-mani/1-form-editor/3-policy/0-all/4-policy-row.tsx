import { useAtomValue } from 'jotai';
import { PolicyState } from '@/store/atoms/3-file-mani-atoms';
import { PolicyEditorDlg } from '@/components/4-dialogs/7-policy';

function PolicyLine({ label, value }: { label: string; value: string | undefined; }) {
    return (<>
        <div className="text-mani-muted-foreground">
            {label}
        </div>

        <div className="text-xs font-mono text-mani-foreground">
            {value || 'no policy'}
        </div>
    </>);
}

export function PolicyItem({ policyAtoms }: { policyAtoms: PolicyState.Atoms; }) {
    const { policyAtom, policy2Atom, policyTextAtom, maniField } = policyAtoms;

    const policy = useAtomValue(policyAtom);
    const policy2 = useAtomValue(policy2Atom);
    const policyText = useAtomValue(policyTextAtom); //TODO: prepare rule or custom policy text

    return (<>
        <div className="px-1 py-1 rounded flex items-start">
            {maniField.displayname || 'no name field'}
        </div>

        <div className="px-1 py-1 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1">
            <PolicyLine label="Main" value={policy} />

            {policy2 && (
                <PolicyLine label="Custom" value={policy2} />
            )}
        </div>

        <div className="flex items-center">
            <PolicyEditorDlg field={maniField} />
        </div>
    </>);
}

//TODO: we need to show only one policy line and check which one to set
//TODO: we need to show explanation of the policy instead of the policy string itself
