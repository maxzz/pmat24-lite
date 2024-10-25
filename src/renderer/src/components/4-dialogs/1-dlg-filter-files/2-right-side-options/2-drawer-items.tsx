import { SymbolDot } from "@/ui/icons";
import { Fragment } from "react/jsx-runtime";

const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

const drawerItems: { key: string; description: string; }[] = [
    { key: "win", description: "logins for Windows apps" },
    { key: "web", description: "logins for web apps" },
    { key: "why", description: "logins with problems to check why" },
    { key: "cap", description: "logins with window caption" },
    { key: "cls", description: "logins with window classname" },
];

export function DrawerItems() {
    return (
        <div className="text-xs px-1">
            <div className="pb-1 font-bold">Search options</div>
            <div className="pb-1">Use the search prefix to dispay only:</div>

            <div className="grid grid-cols-[auto_minmax(0,1fr)]">
                {drawerItems.map(
                    (item) => (<Fragment key={item.key}>
                        <div className="">
                            {/* <SymbolDot className={popupContentDotClasses} /> */}
                            <span className={popupContentTextClasses}>{item.key}:</span>

                        </div>

                        {item.description}
                    </Fragment>))
                }
            </div>
        </div>
    );
}
