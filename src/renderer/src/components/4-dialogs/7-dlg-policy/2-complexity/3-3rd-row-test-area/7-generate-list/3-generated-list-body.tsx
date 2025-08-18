import { Fragment } from "react";
import { GenNPasswordsItem } from "../../../0-all";

export function GeneratedListBody({ generatedList }: { generatedList: GenNPasswordsItem[]; }) {
    return (
        <div className="mb-4 mx-auto px-4 w-fit grid grid-cols-[auto_auto_auto_auto] gap-x-2 gap-y-0.5">
            {generatedList.map(
                (item, idx) => {
                    const testResultClasses = `text-center select-none ${item.ok ? "text-green-500" : "text-red-500"}`;
                    const idxClasses = "text-[0.65rem] text-end text-muted-foreground select-none";
                    const idxStr = `${idx + 1}`.padStart(2, ' ');
                    const lenStr = `${item.psw.length}`.padStart(2, ' ');

                    return (
                        <Fragment key={idx}>
                            <div className={testResultClasses} title={titleResult}>
                                {item.ok ? '✔' : '✖'}
                            </div>

                            <div className={idxClasses} title={titleIndex}>
                                {idxStr}
                            </div>

                            <div className="font-mono" title={titleGeneratedPassword}>
                                {item.psw}
                            </div>

                            <div className={idxClasses} title={titlePasswordLength}>
                                {lenStr}
                            </div>
                        </Fragment>
                    );
                })
            }
        </div>
    );
}

const titleResult = "result of checking";
const titleIndex = "index";
const titleGeneratedPassword = "generated password";
const titlePasswordLength = "password length";

export function copyToClipboard(generatedList: GenNPasswordsItem[]) {
    const text = generatedList.map(
        (item, idx) => `${`${idx + 1}`.padStart(3, ' ')}. ${item.ok ? '✔' : '✖'} ${item.psw}`
    ).join('\n');
    navigator.clipboard.writeText(text);
}
