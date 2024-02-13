import { HTMLAttributes } from 'react';

export function SectionHeader({ children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className="border-border border-b shadow" {...rest}>
            {children}
        </div>
    );
}
