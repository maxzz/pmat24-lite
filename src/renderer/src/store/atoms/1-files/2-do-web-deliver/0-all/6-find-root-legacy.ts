import { pathWithoutFilename } from "@/utils";

export function findShortestPathInFnames(filenames: string[]): string {
    if (!filenames.length) {
        return '';
    }

    let shortestPath = filenames[0];

    for (const filename of filenames) {
        const currentPath = filename;
        if (currentPath.length < shortestPath.length) {
            shortestPath = currentPath;
        }
    }

    return shortestPath;
}

export function fnamesToPaths(filenames: string[]): string[] {
    return filenames.map((filename) => pathWithoutFilename(filename));
}
