export function kbdToIndex(selectedIdx: number, totalItems: number, key: string): number | undefined {
    if (!totalItems) {
        return;
    }

    let rv: number | undefined;

    switch (key) {
        case 'ArrowUp': {
            (selectedIdx > 0) && (rv = selectedIdx - 1);
            break;
        }
        case 'ArrowDown': {
            (selectedIdx < totalItems - 1) && (rv = selectedIdx + 1);
            break;
        }
        case 'Home': {
            rv = 0;
            break;
        }
        case 'End': {
            rv = totalItems - 1;
            break;
        }
    }
    
    return rv;
}
