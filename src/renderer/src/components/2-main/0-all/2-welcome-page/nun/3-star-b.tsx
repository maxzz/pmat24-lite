import { type DependencyList, useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { motion, MotionConfig, useAnimate } from "motion/react";
import { Button } from "@/ui";
import { useMotionTimeline } from "./7-timeline";
import { generateStar, viewBox } from "./8-generate-star";

type StarProps2 = {
    start: number;
    deps?: DependencyList;
};

export function StarB({ start, ...rest }: StarProps2 & ComponentPropsWithoutRef<typeof motion.svg>) {
    const bigRayLength = 50;
    const points1 = generateStar({ center: bigRayLength, bigRayLength: 50, smallRayLength: 0.3 });
    const points2 = generateStar({ center: bigRayLength, bigRayLength: 70, smallRayLength: 0.1 });

    const scope = useMotionTimeline(
        [
            [
            //     ['.pts-g', { scale: 0.2, rotateZ: 45, }, { duration: .02, type: 'spring', bounce: 0.2, }],
                ['.pts-g', { scale: 1, }],
                ['.pts-g', { scale: 0.1 }],
            ],

            // [".root", { opacity: 1, }],
            ['.pts-b', { opacity: 1, }],
            ['.pts-g', { opacity: 1, }],
/** /
            ['.pts-b', { scale: 0.7, }],
            [
                ['.pts-g', { scale: 0.2, rotateZ: 45, }, { duration: .02, type: 'spring', bounce: 0.2, }],
                ['.pts-g', { scale: 1, }],
                ['.pts-g', { scale: 0.1 }],
            ],
            ['.pts-b', { scale: 1, }],

            ['.pts-b', { opacity: 0, }],
            ['.pts-g', { opacity: 0, }],
            // [".root", { opacity: 0, }],
/**/
        ],
        // Infinity
        2,
        [start]
    );

    return (
        <MotionConfig transition={{ duration: 2.5 }}>
            <motion.svg ref={scope} className="root" viewBox={viewBox(bigRayLength)} {...rest}>
                <polygon
                    className="pts-g fill-orange-300 origin-center"
                    points={points2}
                />
                <polygon
                    className="pts-b fill-orange-500"
                    points={points1}
                />
            </motion.svg>
        </MotionConfig>
    );
}
