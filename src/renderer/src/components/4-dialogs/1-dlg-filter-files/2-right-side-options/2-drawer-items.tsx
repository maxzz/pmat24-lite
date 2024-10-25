import { SymbolDot } from "@/ui/icons";
import { Fragment } from "react/jsx-runtime";

const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block font-bold font-mono tracking-tight w-8";

const drawerItems: { key: string; description: string; }[] = [
    { key: "win", description: "for Windows apps" },
    { key: "web", description: "for web apps" },
    { key: "why", description: "with problems" },
    { key: "cap", description: "with window caption" },
    { key: "cls", description: "with window classname" },
];

export function DrawerItems() {
    return (<>
        <div className="pb-1 font-bold">Filter modifiers</div>
        <div className="pb-1.5 text-balance">Use a search prefix to display only logins:</div>

        <div className="grid grid-cols-[auto_minmax(0,1fr)]">
            {drawerItems.map(
                (item) => (<Fragment key={item.key}>
                    {/* <div className=""> */}
                    {/* <SymbolDot className={popupContentDotClasses} /> */}
                    <span className={popupContentTextClasses}>{item.key}:</span>
                    {/* </div> */}

                    {item.description}
                </Fragment>))
            }
        </div>
    </>);
}
