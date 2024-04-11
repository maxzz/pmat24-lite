import { Meta } from '@/store/manifest';
//import { PolicyEditorDlg } from '../dlg-policy-editor';

export function FieldWithPolicyRow({ field }: { field: Meta.Field; }) {
    return (<>
        <div className="px-2 py-1 text-primary-200 bg-primary-700 rounded flex items-start">
            {field.mani.displayname || 'no name field'}
        </div>

        <div className="px-2 py-1 bg-primary-700 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1">
            <div className="text-primary-300">
                Main
            </div>
            <div className="text-blue-400 text-xs font-mono">
                {field.mani.policy}
            </div>

            {field.mani.policy2 && (<>
                <div className="text-primary-300">
                    Custom
                </div>
                <div className="text-xs font-mono text-blue-400">
                    {field.mani.policy2}
                </div>
            </>)}
        </div>

        {/* <div className="flex items-center">
            <PolicyEditorDlg field={field} />
        </div> */}
    </>);
}
