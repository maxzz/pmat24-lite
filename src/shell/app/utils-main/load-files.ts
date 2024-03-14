import { basename, extname, join, normalize } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { FileContent } from '@shared/ipc-types';

function collectNamesRecursively(filenames: string[], rv: Partial<FileContent>[]) {
    (filenames || []).forEach((filename) => {
        filename = normalize(filename);
        try {
            const st = statSync(filename);

            if (st.isFile()) {
                rv.push({
                    basename: basename(filename),
                    fullname: filename,
                });
            } else if (st.isDirectory()) {
                const entries = readdirSync(filename).map((entry) => join(filename, entry));
                collectNamesRecursively(entries, rv);
            }

        } catch (error) {
            rv.push({
                basename: basename(filename),
                fullname: filename,
                raw: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    });
}

export function loadFilesContent(filenames: string[], allowedExt?: string[]): FileContent[] {
    let files: Partial<FileContent>[] = [];
    collectNamesRecursively(filenames, files);

    files = allowedExt
        ? files.map(
            (fileContent) => (
                allowedExt.includes(extname(fileContent.basename || '').replace('.', '').toLowerCase())
                    ? fileContent
                    : { ...fileContent, notOur: true, failed: true }
            )
        )
        : files;

    files.forEach(
        (file) => {
            if (!file.failed && !file.notOur) {
                try {
                    file.raw = readFileSync(file.fullname!).toString();
                } catch (error) {
                    file.raw = error instanceof Error ? error.message : JSON.stringify(error);
                    file.failed = true;
                }
            }
        }
    );

    return files as Required<FileContent>[];
}
