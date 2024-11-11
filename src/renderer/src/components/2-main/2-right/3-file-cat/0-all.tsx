import { type HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { ScrollArea } from '@/ui';
import useResizeObserver from 'use-resize-observer';
import { classNames } from '@/utils';
import { rightPanelAtom } from '@/store';
import { FcViewBody } from './1-cat-body';

export function Body_Cat({ className, ...rest }: {} & HTMLAttributes<HTMLDivElement>) {
    // const { ref, width, height } = useResizeObserver();
    return (<>
        {/* <div ref={ref} className={classNames("relative h-full w-full", className)} {...rest}>
            <div className="aaa absolute inset-0">
                <ScrollArea style={{ width, height }} horizontal fixedWidth> */}
                    <BodyGuard />
                {/* </ScrollArea>
            </div>
        </div> */}
    </>);
}

function BodyGuard() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    if (!fileUsAtom) {
        return null;
    }
    return (
        <FcViewBody fileUsAtom={fileUsAtom} />
    );
}
