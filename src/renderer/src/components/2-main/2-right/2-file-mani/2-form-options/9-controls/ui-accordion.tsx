import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useMeasure } from 'react-use';
import { classNames, disableHiddenChildren } from '@/utils';
import { SubSubGridClasses } from './1-options-row';

export function UiAccordion0({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { top, height }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();

    const firstRun = useRef(true);

    //console.log(`                    %crender   firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: dimgrey');

    useEffect(() => {
        if (!height) return;

        console.log('%cuseEffect                   ', 'background-color: darkgreen; color: lime', `firstRun=${firstRun.current} open=${open} height=${height}`);

        height && (firstRun.current = false);
    }, [height]);

    useLayoutEffect(() => {
        if (!refElm) return;

        console.log('%cuseLayoutEffect             ', "background-color: darkgreen; color: tan", `firstRun=${firstRun.current} open=${open} height=${height}`);

    }, [open, height, refElm]);

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
                {console.log(`                    %cchildren firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: dimgrey') as unknown as null}
                {children}
            </div>
        </a.div>
    );
}

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { top, height }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();

    const firstRun = useRef(true);

    //console.log(`                    %crender   firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: dimgrey');

    useEffect(() => {
        if (!height) return;

        console.log('%cuseEffect                   ', 'background-color: darkgreen; color: lime', `firstRun=${firstRun.current} open=${open} height=${height}`);

        height && (firstRun.current = false);
    }, [height]);

    useLayoutEffect(() => {
        if (!refElm) return;

        console.log('%cuseLayoutEffect             ', "background-color: darkgreen; color: tan", `firstRun=${firstRun.current} open=${open} height=${height}`);

    }, [open, height, refElm]);

    const [styles, api] = useSpring(() => {
        console.log('%cuseSpring                   ', "background-color: darkgreen; color: white", `firstRun=${firstRun.current} open=${open} height=${height}`);

        return {
            height: open ? height : 0,
            ena: disableHiddenChildren(open, refElm),
            config: firstRun.current ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
            onRest: () => {
                console.log(`%conRest                       firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: maroon');
                firstRun.current = false;
            },
        };
    }, [open, height]);

    return (
        <a.div style={styles} className={classNames("overflow-y-hidden smallscroll", SubSubGridClasses)}>
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }} className={SubSubGridClasses}>
                {console.log(`                    %cchildren firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: dimgrey') as unknown as null}
                {children}
            </div>
        </a.div>
    );
}
