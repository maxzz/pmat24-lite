import { classNames } from "@/utils";

interface StarProps extends React.SVGProps<SVGSVGElement> {
    smallRayLength?: number; // 0 to 1, relative to big ray length
    className?: string;
}
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
export function Star({ smallRayLength = 0.5, className, ...props }: StarProps) {
    // Calculate points for 8-pointed star
    const bigRayLength = 50; // Base length for big rays
    const small = bigRayLength * smallRayLength;

    // Points starting from top, going clockwise
    const points = [
        [0, -bigRayLength], /**/ [small, -small],  /**/ // N big // NE small
        [bigRayLength, 0],  /**/ [small, small],   /**/ // E big // SE small
        [0, bigRayLength],  /**/ [-small, small],  /**/ // S big // SW small
        [-bigRayLength, 0], /**/ [-small, -small], /**/ // W big // NW small
    ].map(
        ([x, y]) => `${x + 50},${y + 50}`
    ).join(' ');

    return (
        <svg
            viewBox="0 0 100 100"
            className={classNames("w-6 h-6", className)}
            {...props}
        >
            <polygon
                points={points}
                fill="currentColor" />
        </svg>
    );
}
