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

export function FieldWithPolicyRow({ field }: { field: Meta.Field; }) {
    return (<>
        <div className="px-1 py-1 rounded flex items-start">
            {field.mani.displayname || 'no name field'}
        </div>

        <div className="px-1 py-1 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1">
            <PolicyLine label="Main" value={field.mani.policy} />

            {field.mani.policy2 && (
                <PolicyLine label="Custom" value={field.mani.policy2} />
            )}
        </div>

        <div className="flex items-center">
            <PolicyEditorDlg field={field} />
        </div>
    </>);
}

//TODO: we need to show only one policy line and check which one to set
//TODO: we need to show explanation of the policy instead of the policy string itself
