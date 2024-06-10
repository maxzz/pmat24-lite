import { Fragment } from "react";
import { helpRules } from "./9-rules-text";

export function RulesHelpBody() {
    return (
        <div className="mb-4 px-4 grid grid-cols-[auto,auto] gap-2">
            {helpRules.map((rule, idx) => (
                <Fragment key={idx}>
                    <div className="text-center font-bold">
                        {rule.c1}
                    </div>

                    <div className="mr-3">
                        {rule.c2}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}
