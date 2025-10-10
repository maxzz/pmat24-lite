import { type ReactNode, useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { useMeasure } from "react-use";
import { classNames, disableHiddenChildren } from "@/utils";
import { SubSubGridClasses } from "@/ui/local-ui";

export function UiAccordion({ open, children }: { open: boolean, children: ReactNode; }) {
    const [refMeasure, { height }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();

    const firstRun = useRef(true);

    useEffect(() => { height && (firstRun.current = false); }, [height]);

    const [styles, api] = useSpring(() => {
        const rv = {
            height: open ? height : 0,
            ena: disableHiddenChildren(open, refElm),
            config: firstRun.current ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
            onRest: () => {
                // console.log(`%conRest   firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: maroon');
                firstRun.current = false;
            },
        };
        return rv;
    }, [open, height]);

    useEffect(
        () => {
            // console.log(`%cuseEffect 1                 `, 'background-color: darkgreen; color: white', `firstRun=${firstRun.current} open=${open} height=${height}`);
            
            if (firstRun.current) {
                styles.height.set(height);
                // console.log('%cuseEffect 2                 ', 'background-color: darkgreen; color: blue', `firstRun=${firstRun.current} open=${open} height=${height}`);
            }
        }, [height]
    );

    return (
        <a.div
            className={classNames("overflow-y-hidden smallscroll", SubSubGridClasses)}
            style={styles}
        >
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }} className={SubSubGridClasses}>
                {/* {console.log(`%cchildren firstRun=${firstRun.current} open=${open} height=${height}`, 'background-color: black; color: dimgrey') as unknown as null} */}
                {children}
            </div>
        </a.div>
    );
}
