import { SymbolDot } from "@/ui/icons";

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

            {drawerItems.map(
                (item) => (
                    <div className="flex items-center gap-0.5" key={item.key}>
                        <SymbolDot className={popupContentDotClasses} />
                        <span className={popupContentTextClasses}>{item.key}:</span>
                        {item.description}
                    </div>
                ))
            }
        </div>
    );
}
