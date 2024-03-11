import { InputHTMLAttributes } from "react";

export function InputFileAsDlg({ openFolder, ...rest }: { openFolder?: boolean; } & InputHTMLAttributes<HTMLInputElement>) {
    const doDirOptions = { ...(openFolder && { webkitdirectory: '' }) };
    return (
        <input
            className="hidden"
            type="file"
            multiple
            {...doDirOptions}
            {...rest}
        />
    );
}
