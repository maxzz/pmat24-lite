import { ReactNode, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { useMeasure } from "react-use";
import { disableHiddenChildren } from "@/utils";

export function UiAccordion({ open, children }: { open: boolean; children: ReactNode; }) {
    const [refFn, { height, top }] = useMeasure<HTMLDivElement>();
    const [refEl, setEl] = useState<HTMLDivElement>();
    const [firstRun, setFirstRun] = useState(true);
    const animation = useSpring({
        height: open ? height + top : 0,
        ena: disableHiddenChildren(open, refEl),
        config: firstRun ? { duration: 0 } : { mass: 0.2, tension: 492, clamp: true },
        onRest: () => firstRun && setFirstRun(false),
    });
    return (
        <a.div style={animation} className="overflow-y-hidden smallscroll">
            <div ref={(el) => { el && (setEl(el), refFn(el)); }}>
                {children}
            </div>
        </a.div>
    );
}
