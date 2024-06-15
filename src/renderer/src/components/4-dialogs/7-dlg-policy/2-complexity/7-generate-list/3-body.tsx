import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { generateListAtom } from "../../0-all";

export function GeneratedListBody() {
    const generateList = useAtomValue(generateListAtom);
    console.log(generateList);

    return (
        <div className="mb-4 px-4 grid grid-cols-[auto,auto] gap-2">
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
