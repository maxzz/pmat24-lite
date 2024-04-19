import { TreenIconType } from "@/ui/shadcn/tree";
import { SymbolAppWebChrome, SymbolAppWin, SymbolCatalog, SymbolManualMode } from "@/ui/icons";
import { classNames } from "@/utils";
import { SymbolAppWebIE } from "@/ui/icons/symbols/app/4-app-web-ie";
import { SymbolAppWebIEText } from "@/ui/icons/symbols/app/5-app-web-ie-text";

export const enum AppIconType {
    web,
    win,
    man,            // manual mode
    cat,            // field catalog
}

// webWarning,     // web app warning
// winWarning,     // win app warning
// manWarning,     // manual mode warning

const Web = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames("text-muted-foreground", className)} {...rest} />;

const WebWarning = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames("text-red-500 fill-red-300 opacity-75", className)} {...rest} />;

const Win = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWin className={classNames("text-muted-foreground", className)} {...rest} />;

const WinWarning = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWin className={classNames("text-red-500 fill-red-300 opacity-75", className)} {...rest} />;

const Man = ({ className, ...rest }: SVGIconTypeProps) => <SymbolManualMode className={classNames("text-muted-foreground", className)} {...rest} />;

const ManWarning = ({ className, ...rest }: SVGIconTypeProps) => <SymbolManualMode className={classNames("text-red-500 fill-red-300 opacity-75", className)} {...rest} />;

const Catalog = ({ className, ...rest }: SVGIconTypeProps) => <SymbolCatalog className={classNames("text-muted-foreground", className)} {...rest} />;

const components = {
    [AppIconType.web]: { icon: SymbolAppWebChrome, /**/ normalClasses: "text-muted-foreground", warningClasses: "text-red-500 fill-red-300 opacity-75" },
    [AppIconType.win]: { icon: SymbolAppWin,       /**/ normalClasses: "text-muted-foreground", warningClasses: "text-red-500 fill-red-300 opacity-75" },
    [AppIconType.man]: { icon: SymbolManualMode,   /**/ normalClasses: "text-muted-foreground", warningClasses: "text-red-500 fill-red-300 opacity-75" },
    [AppIconType.cat]: { icon: SymbolCatalog,      /**/ normalClasses: "text-muted-foreground", warningClasses: "" },
};

export function appIcon(iconType: AppIconType, warning?: boolean): TreenIconType {
    const { icon, normalClasses, warningClasses } = components[iconType];
    
    const fn = ({ className, ...rest }: SVGIconTypeProps) => icon({ className: classNames(normalClasses, warning && warningClasses, className), ...rest });
    return fn;
}

// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIE className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIEText className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;


// export function appIcon(iconType: AppIconType, warning?: boolean): TreenIconType {
//     switch (iconType) {
//         case AppIconType.web:
//             return Web;
//         // case AppIconType.webWarning:
//         //     return WebWarning;
//         case AppIconType.win:
//             return Win; //return SymbolAppWin; // return AppWindow;
//         // case AppIconType.winWarning:
//         //     return WinWarning;
//         case AppIconType.man:
//             return Man;
//         // case AppIconType.manWarning:
//         //     return ManWarning;
//         case AppIconType.cat:
//             return Catalog;
//         default: {
//             const _exhaustiveCheck: never = iconType;
//             return _exhaustiveCheck;
//         }
//     }
// }
