/**
 * Converts an image to a Blob.
 * https://github.com/GoogleChromeLabs/browser-fs-access/blob/main/demo/image-to-blob.mjs
 * @param {HTMLImageElement} img - Image element.
 * @return {Blob} Resulting Blob.
 */
export async function imageToBlob(img: HTMLImageElement): Promise<Blob | null> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get 2d context');
        }

        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
            resolve(blob);
        });
    });
}
