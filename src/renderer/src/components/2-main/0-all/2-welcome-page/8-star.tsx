import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { motion, MotionConfig, useAnimate } from "motion/react";
import { Button } from "@/ui";
import { useMotionTimeline } from "./8-timeline";

type StarProps = {
    start: boolean;
};

/**
 * ```md
 * Features:
 *      * smallRayLength: Controls the length of small rays relative to big rays (0 to 1)
 *      * Uses CSS currentColor for easy color customization
 *      * Accepts all standard SVG props
 *      * Centered in a 100x100 viewBox
 *      * Default size is 1.5rem (w-6 h-6)
 *      * Customizable via className prop
 * The star will have:
 *      * 4 big rays pointing North, East, South, and West
 *      * 4 smaller rays at 45-degree angles between the big rays
 *      * Responsive and scalable vector graphics
 *      * Maintains aspect ratio when resized
 * ```
 */
export function Star({ start, ...rest }: StarProps & ComponentPropsWithoutRef<typeof motion.svg>) {
    const bigRayLength = 50;
    const points1 = generateStar({ center: bigRayLength, bigRayLength: 50, smallRayLength: 0.3 });
    const points2 = generateStar({ center: bigRayLength, bigRayLength: 70, smallRayLength: 0.1 });
    const [scope, animate] = useAnimate();

    function sequence() {
        animate([
            [scope.current, { opacity: 1, }],
            ['.pts-b', { scale: 0.7, }],

            ['.pts-g', { scale: 0.2, rotateZ: 45, }, { duration: .02, type: 'spring', bounce: 0.2, }],
            ['.pts-g', { scale: 1, }],
            ['.pts-g', { scale: 0.1 }],

            ['.pts-b', { scale: 1, }],
            [scope.current, { opacity: 0, }],
        ]);
    }

    useEffect(
        () => {
            sequence();
        }, [start]
    );

    return (
        <MotionConfig transition={{ duration: 2.5 }}>
            <motion.svg ref={scope} viewBox={viewBox(bigRayLength)} {...rest}>
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

function viewBox(bigRayLength: number): string {
    return `0 0 ${bigRayLength * 2} ${bigRayLength * 2}`;
}

/**
 * Calculate points for 8-pointed star
 * @param bigRayLength - Base length for big rays
 * @param smallRayLength - The length of small rays relative to big rays (0 to 1)
 * @returns 
 */
function generateStar({ center, bigRayLength = 50, smallRayLength = 0.5 }: { center: number; bigRayLength?: number; smallRayLength?: number; }) {
    const small = bigRayLength * smallRayLength;

    // Points starting from top, going clockwise
    const points = [
        [0, -bigRayLength], /**/[small, -small],  /**/ // N big // NE small
        [bigRayLength, 0],  /**/[small, small],   /**/ // E big // SE small
        [0, bigRayLength],  /**/[-small, small],  /**/ // S big // SW small
        [-bigRayLength, 0], /**/[-small, -small], /**/ // W big // NW small
    ].map(
        ([x, y]) => `${x + center},${y + center}`
    ).join(' ');

    return points;
}

export function StarTest({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const [render, setRender] = useState(false);
    useEffect(
        () => {
            setTimeout(() => setRender(true), 1000);
        }, []
    );
    return (
        <div className={classNames("absolute right-32 top-48 grid place-items-center z-50", className)} {...rest}>
            <div className="relative mt-64">
                <Button className="absolute top-0 -right-24 active:scale-95" onClick={() => setRender(v => !v)}>
                    Rerender ({render ? "y" : "n"})
                </Button>
                <Star className="w-12 h-12" start={render} />
                <Star2 className="w-12 h-12" start={render} />
            </div>
        </div>
    );
}

export function Star2({ start, ...rest }: StarProps & ComponentPropsWithoutRef<typeof motion.svg>) {
    const bigRayLength = 50;
    const points1 = generateStar({ center: bigRayLength, bigRayLength: 50, smallRayLength: 0.3 });
    const points2 = generateStar({ center: bigRayLength, bigRayLength: 70, smallRayLength: 0.1 });

    const scope = useMotionTimeline(
        [
            // [".root", { opacity: 1, }],
            ['.pts-b', { opacity: 1, }],
            ['.pts-g', { opacity: 1, }],

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
        ],
        // Infinity
        2
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
