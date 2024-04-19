import { TreenIconType } from "@/ui/shadcn/tree";
import { SymbolAppWebChrome, SymbolAppWin, SymbolCatalog, SymbolManualMode } from "@/ui/icons";
import { classNames } from "@/utils";
import { SymbolAppWebIE } from "@/ui/icons/symbols/app/4-app-web-ie";
import { SymbolAppWebIEText } from "@/ui/icons/symbols/app/5-app-web-ie-text";
import { FileUs } from "../store-types";
import { isAnyWhy, isManual } from "./3-mani-utils";

export const enum AppIconType {
    web,    // web chrome
    win,    // windows app
    man,    // manual mode
    ie6,    // internet explorer 6-11
    cat,    // field catalog
}

type IconsTable = Record<AppIconType, { Icon: TreenIconType, normalClasses: string, warningClasses: string }>;

const normalClasses = "text-muted-foreground";
const warningClasses = "text-red-500 fill-red-300 opacity-75";

const components: IconsTable = {
    [AppIconType.web]: { Icon: SymbolAppWebChrome, /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [AppIconType.win]: { Icon: SymbolAppWin,       /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [AppIconType.man]: { Icon: SymbolManualMode,   /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [AppIconType.ie6]: { Icon: SymbolAppWebIEText, /**/ normalClasses: normalClasses, warningClasses: "" },
    [AppIconType.cat]: { Icon: SymbolCatalog,      /**/ normalClasses: normalClasses, warningClasses: "" },
};

export function appIcon(iconType: AppIconType, warning?: boolean): TreenIconType {
    const { Icon, normalClasses, warningClasses } = components[iconType];

    const fn: SVGIconType = ({ className, ...rest }: SVGIconTypeProps) => <Icon className={classNames(warning ? warningClasses : normalClasses, className)} {...rest} />;
    return fn;
}

// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIE     className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIEText className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;

export function fileUsToIcon(fcnt: FileUs): { icon: AppIconType; hasBailOut: boolean } {
    if (fcnt.fcat) {
        return { icon: AppIconType.cat, hasBailOut: false };
    }

    const hasBailOut = isAnyWhy(fcnt);

    // if (isAnyIe6(fcnt)) { // OK: but commented out ie6 for now. there are too many of them
    //     return { icon: AppIconType.ie6, hasBailOut };
    // }

    const icon =
        fcnt.stats.isWeb
            ? AppIconType.web
            : isManual(fcnt)
                ? AppIconType.man
                : AppIconType.win;
    return {
        icon,
        hasBailOut,
    };
}
