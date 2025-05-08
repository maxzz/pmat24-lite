import { classNames } from "@/utils";

interface StarProps extends React.SVGProps<SVGSVGElement> {
    smallRayLength?: number; // 0 to 1, relative to big ray length
    className?: string;
}

export function Star({ smallRayLength = 0.5, className, ...props }: StarProps) {
    // Calculate points for 8-pointed star
    const bigRayLength = 50; // Base length for big rays
    const small = bigRayLength * smallRayLength;

    // Points starting from top, going clockwise
    const points = [
        [0, -bigRayLength], // N big
        [small, -small], // NE small
        [bigRayLength, 0], // E big
        [small, small], // SE small
        [0, bigRayLength], // S big
        [-small, small], // SW small
        [-bigRayLength, 0], // W big
        [-small, -small], // NW small
    ].map(([x, y]) => `${x + 50},${y + 50}`).join(' ');

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
