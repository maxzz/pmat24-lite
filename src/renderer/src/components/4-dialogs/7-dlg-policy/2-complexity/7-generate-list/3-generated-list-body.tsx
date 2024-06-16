import { Fragment } from "react";
import { GenerateListItem } from "../../0-all";

export function GeneratedListBody({ generatedList }: { generatedList: GenerateListItem[]; }) {
    return (
        <div className="mb-4 px-4 grid grid-cols-[auto,auto,auto,auto] gap-x-2 gap-y-0.5">
            {generatedList.map((item, idx) => {
                const first = `${idx + 1}`.padStart(2, ' ');
                const colorClasses = `select-none ${item.ok ? "text-green-500" : "text-red-500"}`;
                const numberClasses = "text-[0.65rem] text-end select-none";
                return (
                    <Fragment key={idx}>
                        <div className={colorClasses}>
                            {item.ok ? '✔' : '❌'}
                        </div>

                        <div className={numberClasses}>
                            {first}
                        </div>

                        <div className="font-mono">
                            {item.psw}
                        </div>

                        <div className={numberClasses}>
                            {`${item.psw.length}`.padStart(2, ' ')}
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}
