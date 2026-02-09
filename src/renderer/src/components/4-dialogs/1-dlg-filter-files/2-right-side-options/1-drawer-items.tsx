import { Fragment } from "react";

export function DrawerItems() {
    return (<>
        <div className="w-max grid grid-cols-[auto_minmax(0,1fr)]">
            {drawerItems.map(
                (item) => (<Fragment key={item.key}>
                    {/* <div> */}
                    {/* <SymbolDot className={popupContentDotClasses} /> */}
                    <span className={popupContentTextClasses}>{item.key}:</span>
                    {/* </div> */}

                    {item.description}
                </Fragment>))
            }
        </div>
    </>);
}

// const popupContentDotClasses = "w-3 h-3 inline fill-foreground/70 stroke-foreground/50 stroke-2";
const popupContentTextClasses = "inline-block w-8 font-bold font-mono tracking-tight";

const drawerItems: { key: string; description: string; }[] = [
    { key: "win", description: "for Windows apps" },
    { key: "web", description: "for websites" },
    { key: "why", description: "with problems" },
    { key: "cap", description: "with window caption" },
    { key: "cls", description: "with window classname" },
    { key: "ext", description: "with extended authentication policy" },
];
