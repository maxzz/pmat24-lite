import { pathWithoutFilename } from "@/utils";

export function findShortestPathInFnames(filenames: string[]): string {
    if (!filenames.length) {
        return '';
    }

    let shortestPath = pathWithoutFilename(filenames[0]);

    for (const filename of filenames) {
        const currentPath = pathWithoutFilename(filename);
        if (currentPath.length < shortestPath.length) {
            shortestPath = currentPath;
        }
    }

    return shortestPath;
}
