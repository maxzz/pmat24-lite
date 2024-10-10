import { InputHTMLAttributes } from "react";

type InputFileAsDlgProps = InputHTMLAttributes<HTMLInputElement> & {
    openAsFolder?: boolean;   // folder mode: open folder
    multiple?: boolean;     // files mode only: open multiple files
};

// export function InputFileAsDlg({ openAsFolder, multiple = true, ...rest }: InputFileAsDlgProps) {

//     const options = {
//         ...(openAsFolder && { webkitdirectory: '' }),
//     };

//     return (
//         <input
//             className="hidden"
//             type="file"
//             multiple={multiple}
//             {...options}
//             {...rest}
//         />
//     );
// }

export function InputFileAsDlg({ openAsFolder, multiple = true, ...rest }: InputFileAsDlgProps) {

    const options = {
        ...(openAsFolder && { webkitdirectory: '' }),
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
