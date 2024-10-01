import { InputHTMLAttributes } from "react";

type InputFileAsDlgProps = InputHTMLAttributes<HTMLInputElement> & {
    openFolder?: boolean;   // folder mode: open folder
    multiple?: boolean;     // files mode only: open multiple files
};

export function InputFileAsDlg({ openFolder, multiple = true, ...rest }: InputFileAsDlgProps) {

    const options = {
        ...(openFolder && { webkitdirectory: '' }),
    };

    return (
        <input
            className="hidden"
            type="file"
            multiple={multiple}
            {...options}
            {...rest}
        />
    );
}
