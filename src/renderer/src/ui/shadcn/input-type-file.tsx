import { InputHTMLAttributes } from "react";

type InputFileAsDlgProps = {
    openFolder?: boolean;
    multiple?: boolean;
};

export function InputFileAsDlg({ openFolder, multiple = true, ...rest }: InputFileAsDlgProps & InputHTMLAttributes<HTMLInputElement>) {
    const options = {
        ...(openFolder && { webkitdirectory: '' }),
    };
    return (
        <input className="hidden" type="file" multiple={multiple} {...options} {...rest} />
    );
}
