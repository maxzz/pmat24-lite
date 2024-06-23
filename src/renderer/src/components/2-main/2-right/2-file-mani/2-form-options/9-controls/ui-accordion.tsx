import React, { ReactNode, useEffect, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { classNames, disableHiddenChildren } from '@/utils';
import { SubSubGridClasses } from '../3-sections/1-general';

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { height, top }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();
    const [firstRun, setFirstRun] = React.useState(true);

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        }
    }, [firstRun]);

    const animation = useSpring({
        height: open ? height + top : 0,
        ena: disableHiddenChildren(open, refElm),
        config: firstRun ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => firstRun && setFirstRun(false),
    });

    return (
        <a.div style={animation} className={classNames("overflow-y-hidden smallscroll", SubSubGridClasses)}>
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }} className={SubSubGridClasses}>
                {children}
            </div>
        </a.div>
    );
}
