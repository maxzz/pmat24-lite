export function setIconLocation(quadrant: number, x: number, y: number): string {
    // Check if we have valid quadrant values (Quad 0 , quad 1, quad 2, quad 3 i.e. 1 to 4).
    // Note: We ignore "None" i.e. 0.
    if (quadrant < 1 || quadrant > 4) {
        return "";
    }

    // Note: We need to subtract 1 to match with external quadrant values (Quad 1 to 4 equivalent 0 to 3).
    return `Q:${quadrant - 1}:${x}:${y}`;
}

export function getIconLocation(iconLoc: string): { quadrant: number; x: number; y: number } | null {
    // Check if input parameter is valid.
    if (!iconLoc) {
        return null;
    }

    // Extract icon location details
    const parts = iconLoc.split(':');

    // Check if input location format is valid.
    // Expected format: Q:<quad>:x:y.
    if (parts.length !== 4) {
        return null;
    }

    // Update return values and return succeeded status.
    // Note: Add 1 to the input location (quadrant) to match with our internal list (None,quad 0,quad 1,quad 2,quad 3) etc.
    const quadrant = parseInt(parts[1], 10) + 1;
    const x = parseInt(parts[2], 10);
    const y = parseInt(parts[3], 10);

    if (isNaN(quadrant) || isNaN(x) || isNaN(y)) {
        return null;
    }

    return {
        quadrant,
        x,
        y
    };
}
