import { type HTMLAttributes } from 'react';
import { ScrollArea } from '@/ui';
import useResizeObserver from 'use-resize-observer';
import { classNames } from '@/utils';

export function Body_Cat({ text, className, ...rest }: { text: string; } & HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("h-full w-full", className)} ref={ref} {...rest}>
            <ScrollArea style={{ width, height }} horizontal>
                123
            </ScrollArea>
        </div>
    </>);
}
