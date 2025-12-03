export type IconLocation = {
    quadrand: number; // 0 - default (or as none), 1 - top left, 2 - top right, 3 - bottom left, 4 - bottom right
    x: number;
    y: number;
};

export const defaultIconLocation = 'Q:0:0:0';

export function isDefault(loc: string): boolean {
    return loc === defaultIconLocation;
}

export function getQuadrant(iconLocation: string | undefined): number {
    const s = iconLocationFromStr(iconLocation);
    return s?.quadrand || 0;
}

export function setQuadrant(iconLocation: string | undefined, quadrant: number): string {
    const s = iconLocationFromStr(iconLocation) || { quadrand: 0, x: 0, y: 0 };
    s.quadrand = quadrant;
    return iconLocationToStr(s);
}

// function sameQuadrants(locA: string, locB: string): boolean {
//     return getQuadrant(locA) === getQuadrant(locB);
// }

// Low-level access

export function parseIconLocation(iconLoc: string | undefined): IconLocation{
    const rv = iconLocationFromStr(iconLoc) || { quadrand: 0, x: 0, y: 0 };
    return rv;
}

export function iconLocationFromStr(iconLoc: string | undefined): IconLocation | undefined {
    if (!iconLoc) {
        return;
    }

    const parts = iconLoc.split(':');
    if (parts.length !== 4 || parts[0] !== 'Q') { // Check if input location format is valid. Expected format: Q:<quad>:x:y.
        return;
    }

    // Note: Add 1 to the input location (quadrant) to match with our internal list (None,quad 0,quad 1,quad 2,quad 3) etc.
    const quadrant = +parts[1] + 1;
    const x = +parts[2];
    const y = +parts[3];

    if (Number.isNaN(quadrant) || Number.isNaN(x) || Number.isNaN(y)) {
        return;
    }

    return { quadrand: quadrant, x, y };
}

export function iconLocationToStr({ quadrand: quadrant, x, y }: IconLocation): string {
    return quadrant < 1 || quadrant > 4 ? defaultIconLocation : `Q:${quadrant - 1}:${x}:${y}`;
}
