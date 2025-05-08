import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

type StarProps = {};

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
export function Star({ className, ...rest }: StarProps & ComponentPropsWithoutRef<'svg'>) {
    const bigRayLength = 50;
    const points1 = generateStar({ center: bigRayLength, bigRayLength, smallRayLength: 0.3 });
    const points2 = generateStar({ center: bigRayLength, bigRayLength: 70, smallRayLength: 0.1 });
    return (
        <svg
            viewBox={viewBox(bigRayLength)}
            className={classNames("", className)}
            {...rest}
        >
            <polygon
                className="rotate-45 origin-center fill-blue-300"
                points={points2}
            />
            <polygon
                points={points1}
                fill="currentColor"
            />
        </svg>
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
