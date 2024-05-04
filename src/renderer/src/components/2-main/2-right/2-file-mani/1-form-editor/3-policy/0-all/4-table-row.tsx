import { useAtomValue } from 'jotai';
import { PolicyState } from '@/store/atoms/3-file-mani-atoms';
import { Meta } from '@/store/manifest';
import { PolicyEditorDlg } from '../dlg-policy-editor';

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

// export function FieldWithPolicyRow({ field }: { field: Meta.Field; }) {
//     return (<>
//         <div className="px-1 py-1 rounded flex items-start">
//             {field.mani.displayname || 'no name field'}
//         </div>

//         <div className="px-1 py-1 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1">
//             <PolicyLine label="Main" value={field.mani.policy} />

//             {field.mani.policy2 && (
//                 <PolicyLine label="Custom" value={field.mani.policy2} />
//             )}
//         </div>

//         <div className="flex items-center">
//             <PolicyEditorDlg field={field} />
//         </div>
//     </>);
// }

//TODO: we need to show only one policy line and check which one to set
//TODO: we need to show explanation of the policy instead of the policy string itself

export function PolicyItem({ policyAtoms }: { policyAtoms: PolicyState.Atoms; }) {
    const { policyAtom, policy2Atom, policyTextAtom, maniField } = policyAtoms;

    const policy = useAtomValue(policyAtom);
    const policy2 = useAtomValue(policy2Atom);
    const policyText = useAtomValue(policyTextAtom);

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

{/* <div className="flex items-center">
<div className="flex-1">{policyAtoms.maniField.displayname || 'no name field'}</div>
<div className="flex-1">{policy}</div>
<div className="flex-1">{policy2}</div>
</div> */}
