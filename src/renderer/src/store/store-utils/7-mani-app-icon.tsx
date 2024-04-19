import { TreenIconType } from "@/ui/shadcn/tree";
import { SymbolAppWebChrome, SymbolAppWin, SymbolCatalog, SymbolManualMode } from "@/ui/icons";
import { classNames } from "@/utils";
import { SymbolAppWebIE } from "@/ui/icons/symbols/app/4-app-web-ie";
import { SymbolAppWebIEText } from "@/ui/icons/symbols/app/5-app-web-ie-text";

export const enum AppIconType {
    web,
    win,
    man,    // manual mode
    cat,    // field catalog
    ie6,    // internet explorer 6-11
}

type IconsTable = Record<AppIconType, { Icon: TreenIconType, normalClasses: string, warningClasses: string }>;

const normalClasses = "text-muted-foreground";
const warningClasses = "text-red-500 fill-red-300 opacity-75";

const components: IconsTable = {
    [AppIconType.web]: { Icon: SymbolAppWebChrome, /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [AppIconType.win]: { Icon: SymbolAppWin,       /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [AppIconType.man]: { Icon: SymbolManualMode,   /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [AppIconType.cat]: { Icon: SymbolCatalog,      /**/ normalClasses: normalClasses, warningClasses: "" },
    [AppIconType.ie6]: { Icon: SymbolAppWebIEText, /**/ normalClasses: normalClasses, warningClasses: "" },
};

export function appIcon(iconType: AppIconType, warning?: boolean): TreenIconType {
    const { Icon, normalClasses, warningClasses } = components[iconType];

    const fn: SVGIconType = ({ className, ...rest }: SVGIconTypeProps) => <Icon className={classNames(warning ? warningClasses : normalClasses, className)} {...rest} />;
    return fn;
}

// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIE className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIEText className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
