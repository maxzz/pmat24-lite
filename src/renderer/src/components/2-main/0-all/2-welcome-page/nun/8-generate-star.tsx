export function viewBox(bigRayLength: number): string {
    return `0 0 ${bigRayLength * 2} ${bigRayLength * 2}`;
}

/**
 * Calculate points for 8-pointed star
 * @param bigRayLength - Base length for big rays
 * @param smallRayLength - The length of small rays relative to big rays (0 to 1)
 * @returns
 */
export function generateStar({ center, bigRayLength = 50, smallRayLength = 0.5 }: { center: number; bigRayLength?: number; smallRayLength?: number; }) {
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
