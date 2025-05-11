import { type DependencyList, useEffect, type ComponentPropsWithoutRef } from "react";
import { motion, MotionConfig, useAnimate } from "motion/react";
import { generateStar, viewBox } from "./8-generate-star";

type StarProps = {
    start: boolean;
    deps?: DependencyList;
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
export function StarA({ start, ...rest }: StarProps & ComponentPropsWithoutRef<typeof motion.svg>) {
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
