export function textFileReader(file: File): Promise<string> {
    return new Promise(
        (resolve, reject) => {
            const onAbort = () => reject(`File (${file.name}) reading was aborted`);
            const onLoaded = () => resolve(reader.result?.toString() || '');

            const reader = new FileReader();
            reader.onabort = onAbort;
            reader.onerror = onAbort;
            reader.onload = onLoaded;
            reader.readAsText(file);
        }
    );
}
