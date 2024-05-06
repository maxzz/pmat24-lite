import { ReactNode } from 'react';
import { Label } from '@/ui';

export function RowLabel({ label, children }: { label: string; children: ReactNode;}) {
    return (
        <Label className="grid grid-cols-subgrid col-span-2 items-center text-xs font-light">
            <div>
                {label}
            </div>
            
            {children}
        </Label>
    );
}
