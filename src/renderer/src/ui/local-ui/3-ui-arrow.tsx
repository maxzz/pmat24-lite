import { SVGAttributes } from "react";
import { a, useSpring } from "@react-spring/web";
import { classNames } from "@/utils";

export function UiArrow({ open, className, ...rest }: { open: boolean; } & SVGAttributes<SVGSVGElement>) {

    const styles = useSpring({
        open: open ? 1 : 0,
        config: { mass: 0.2, tension: 492, clamp: true }
    });

    return (
        <svg className={classNames("stroke-current stroke-[.6rem] fill-transparent", className)} viewBox="0 0 100 100" {...rest}>
            <a.path
                d={styles.open.to({
                    range: [0, .3, 1],
                    output: ["M 50 13 L 80 43 L 50 72", "M 50 13 L 50 42 L 50 72", "M 80 35 L 50 65 L 20 35"]
                })}
            />
        </svg>
    );
}
