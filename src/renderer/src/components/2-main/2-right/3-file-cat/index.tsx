import { type HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { ScrollArea } from '@/ui';
import useResizeObserver from 'use-resize-observer';
import { classNames } from '@/utils';
import { type FileUsAtom } from '@/store/store-types';
import { rightPanelAtom } from '@/store';

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

export function Guard() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    if (!fileUsAtom) {
        return null;
    }
    return (
        <CatBody fileUsAtom={fileUsAtom} />
    );
}

function CatBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("h-full w-full", className)}{...rest}>
            1234
        </div>
    );
}
