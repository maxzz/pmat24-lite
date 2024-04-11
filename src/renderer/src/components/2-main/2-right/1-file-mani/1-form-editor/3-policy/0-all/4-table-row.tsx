import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Meta } from '@/store/manifest';
//import { PolicyEditorDlg } from '../dlg-policy-editor';
import { classNames, turnOffAutoComplete } from '@/utils';

function Input({ valueAtom, className, ...rest }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <input
            className={classNames(
                "px-2 py-3 h-8",
                "bg-primary-700 text-primary-200 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded",
                className
            )}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            {...turnOffAutoComplete}
            {...rest} />
    );
}

export function FieldWithPolicyRow({ field }: { field: Meta.Field; }) {
    return (<>
        <div className="px-2 py-1 text-primary-200 bg-primary-700 rounded flex items-start">
            {field.mani.displayname || 'no name field'}
        </div>

        <div className="px-2 py-1 bg-primary-700 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2">
            <div className="text-primary-500">
                Main
            </div>
            <div className="text-blue-400 text-[.7rem] font-mono">
                {field.mani.policy}
            </div>

            {field.mani.policy2 && (<>
                <div className="text-primary-500">
                    Custom
                </div>
                <div className="text-blue-400 text-[.7rem] font-mono">
                    {field.mani.policy2}
                </div>
            </>)}
        </div>

        {/* <div className="flex items-center">
            <PolicyEditorDlg field={field} />
        </div> */}
    </>);
}
