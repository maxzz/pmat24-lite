import { ReactNode, useEffect, useRef, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { classNames, disableHiddenChildren } from '@/utils';
import { SubSubGridClasses } from '../3-sections/1-general';

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { top, height }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();

    const firstRun = useRef(true);
    useEffect(() => { firstRun.current = false; }, []);

    const animation = useSpring({
        height: open ? height : 0,
        ena: disableHiddenChildren(open, refElm),
        config: firstRun.current ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => firstRun.current && (firstRun.current = false),
    });

    return (
        <a.div style={animation} className={classNames("overflow-y-hidden smallscroll", SubSubGridClasses)}>
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }} className={SubSubGridClasses}>
                {children}
            </div>
        </a.div>
    );
}
