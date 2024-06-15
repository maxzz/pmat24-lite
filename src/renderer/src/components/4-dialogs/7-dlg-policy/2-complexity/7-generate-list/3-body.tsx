import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { GenerateListItem, generateListAtom } from "../../0-all";

export function GeneratedListBody({ generateList }: { generateList: GenerateListItem[]; }) {
    return (
        <div className="mb-4 px-4 grid grid-cols-[auto,auto] gap-x-2 gap-y-0.5">
            {generateList.map((item, idx) => {
                const first = `${idx + 1}`.padStart(2, ' ');
                const firstClasses = `text-end ${item.ok ? 'text-green-500' : 'text-red-500'}`;
                return (
                    <Fragment key={idx}>
                        <div className={firstClasses}>{first}</div>

                        <div className="mr-3 font-mono">
                            {item.psw}
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}
