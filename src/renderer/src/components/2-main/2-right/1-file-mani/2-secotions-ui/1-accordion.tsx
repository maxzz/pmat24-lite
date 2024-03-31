import { ReactNode, useEffect, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { useMeasure } from "react-use";
import { disableHiddenChildren } from "@/utils";

export function UiAccordion({ open, children }: { open: boolean; children: ReactNode; }) {
    const [refMeasure, { height, top }] = useMeasure<HTMLDivElement>();
    const [refElm, setElm] = useState<HTMLDivElement>();
    const [firstRun, setFirstRun] = useState(true);

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
        <a.div style={animation} className="overflow-y-hidden smallscroll">
            <div ref={(el) => { el && (setElm(el), refMeasure(el)); }}>
                {children}
            </div>
        </a.div>
    );
}
