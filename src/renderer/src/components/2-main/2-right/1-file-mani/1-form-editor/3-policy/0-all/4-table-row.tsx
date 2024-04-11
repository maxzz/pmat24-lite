import { Meta } from '@/store/manifest';
import { PolicyEditorDlg } from '../dlg-policy-editor';

export function FieldWithPolicyRow({ field }: { field: Meta.Field; }) {
    return (<>
        <div className="px-2 py-1 rounded flex items-start">
            {field.mani.displayname || 'no name field'}
        </div>

        <div className="px-2 py-1 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1">
            <div className="text-mani-muted-foreground">
                Main
            </div>
            <div className="text-xs font-mono text-mani-foreground">
                {field.mani.policy}
            </div>

            {field.mani.policy2 && (<>
                <div className="text-mani-muted-foreground">
                    Custom
                </div>
                <div className="text-xs font-mono text-mani-foreground">
                    {field.mani.policy2}
                </div>
            </>)}
        </div>

        <div className="flex items-center">
            <PolicyEditorDlg field={field} />
        </div>
    </>);
}
