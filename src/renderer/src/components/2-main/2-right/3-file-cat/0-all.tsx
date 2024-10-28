import { type HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { ScrollArea } from '@/ui';
import useResizeObserver from 'use-resize-observer';
import { classNames } from '@/utils';
import { rightPanelAtom } from '@/store';
import { CatBody } from './1-cat-body';

export function Body_Cat({ className, ...rest }: {} & HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("h-full w-full", className)} ref={ref} {...rest}>
            <ScrollArea style={{ width, height }} horizontal>
                <Guard />
            </ScrollArea>
        </div>
    </>);
}

function Guard() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    if (!fileUsAtom) {
        return null;
    }
    return (
        <CatBody fileUsAtom={fileUsAtom} />
    );
}
