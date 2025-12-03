export type IconLocation = {
    quadrant: number; // 0 - default (or as none), 1 - top left, 2 - top right, 3 - bottom left, 4 - bottom right
    x: number;
    y: number;
};

export function iconLocationToStr({ quadrant, x, y }: IconLocation): string {
    return quadrant < 1 || quadrant > 4 ? '' : `Q:${quadrant - 1}:${x}:${y}`;
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

    return { quadrant, x, y };
}

export function setQuadrant(iconLocation: string | undefined, quadrant: number): string | undefined {
    const s = iconLocationFromStr(iconLocation);
    if (!s) {
        return iconLocation;
    }
    s.quadrant = quadrant;
    return iconLocationToStr(s);
}

export function getQuadrant(iconLocation: string | undefined): number {
    const s = iconLocationFromStr(iconLocation);
    return s?.quadrant || 0;
}
