import { TreenIconComponent } from "@/ui/shadcn/tree";
import { IconTypeWithWarning } from "./7-file-us-to-app-type";
import { SymbolAppWebChrome, SymbolAppWebIeDot, SymbolAppWin, SymbolCatalog, SymbolManualMode } from "@/ui/icons";
import { classNames } from "@/utils";
// import { SymbolAppWebIe } from "@/ui/icons/symbols/app/4-app-web-ie";
// import { SymbolAppWebIeText } from "@/ui/icons/symbols/app/5-app-web-ie-text";

export const enum FormIconType {
    web,    // web chrome
    win,    // windows app
    man,    // manual mode
    ie6,    // internet explorer 6-11
    cat,    // field catalog
}

type IconsTable = Record<FormIconType, { Icon: TreenIconComponent, normalClasses: string, warningClasses: string; }>;

const normalClasses = "text-muted-foreground";
const warningClasses = "text-red-500 fill-red-300 opacity-75";

const components: IconsTable = {
    [FormIconType.web]: { Icon: SymbolAppWebChrome, /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [FormIconType.win]: { Icon: SymbolAppWin,       /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [FormIconType.man]: { Icon: SymbolManualMode,   /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [FormIconType.ie6]: { Icon: SymbolAppWebIeDot,  /**/ normalClasses: normalClasses, warningClasses: "" },
    [FormIconType.cat]: { Icon: SymbolCatalog,      /**/ normalClasses: normalClasses, warningClasses: "" },
};

export function appTypeToIcon({ appIcon, warning }: IconTypeWithWarning): TreenIconComponent {
    const { Icon, normalClasses, warningClasses } = components[appIcon];

    const fn: SVGIconComponent = ({ className, ...rest }: SVGIconTypeProps) => (
        <Icon className={classNames(warning ? warningClasses : normalClasses, className)} {...rest} />
    );
    
    return fn;
}

// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIE     className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIEText className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
