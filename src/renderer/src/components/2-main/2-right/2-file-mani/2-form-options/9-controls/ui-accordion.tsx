import { ReactNode, useEffect, useRef, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { classNames, disableHiddenChildren } from '@/utils';
import { SubSubGridClasses } from './1-options-row';

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { top, height }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();

    const firstRun = useRef(true);

    console.log('UiAccordion render', open, height);
    useEffect(() => {
        if (!height) return;
        
        console.log('UiAccordion firstRun', firstRun.current);

        height && (firstRun.current = false);
    }, [height]);

    const animation = useSpring({
        height: open ? height : 0,
        ena: disableHiddenChildren(open, refElm),
        config: firstRun.current ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => {
            console.log('UiAccordion onRest', open, height);
            firstRun.current = false;
        },
    });

    return (
        <a.div style={animation} className={classNames("overflow-y-hidden smallscroll", SubSubGridClasses)}>
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }} className={SubSubGridClasses}>
                {console.log('-------------------children', open, height) as unknown as null}
                {children}
            </div>
        </a.div>
    );
}
