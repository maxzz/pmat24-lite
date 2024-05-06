import { InputHTMLAttributes } from 'react';
import { Label } from '@/ui';

export function InputLabel({ label, children, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; }) {
    return (
        <Label className="grid grid-cols-subgrid col-span-2 items-center text-xs font-light">
            <div>
                {label}
            </div>
            
            {children}
        </Label>
    );
}
