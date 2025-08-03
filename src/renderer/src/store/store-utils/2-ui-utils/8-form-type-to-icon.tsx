import { type TreenIconComponent } from "@/ui/shadcn/tree";
import { type IconEnumWithWarning } from "./7-file-us-to-app-type";
import { SymbolAppWebChrome, SymbolAppWebIeDot, SymbolAppWin, SymbolCatalog, SymbolManualMode } from "@/ui/icons";
import { classNames } from "@/utils";
// import { SymbolAppWebIe } from "@/ui/icons/symbols/app/4-app-web-ie";
// import { SymbolAppWebIeText } from "@/ui/icons/symbols/app/5-app-web-ie-text";

export const enum FormIconEnum {
    web,    // web chrome
    win,    // windows app
    man,    // manual mode
    ie6,    // internet explorer 6-11
    cat,    // field catalog
}

type IconsTable = Record<FormIconEnum, { Icon: TreenIconComponent, normalClasses: string, warningClasses: string; }>;

const normalClasses = "text-muted-foreground";
const warningClasses = "text-red-500 fill-red-50 dark:fill-red-900 opacity-75";
const warningIeClasses = "text-red-500 fill-red-50 dark:fill-red-900 opacity-75 [--dot-center-color:#ff1b1b]";

const components: IconsTable = {
    [FormIconEnum.web]: { Icon: SymbolAppWebChrome, /**/ normalClasses, warningClasses, },
    [FormIconEnum.win]: { Icon: SymbolAppWin,       /**/ normalClasses, warningClasses, },
    [FormIconEnum.man]: { Icon: SymbolManualMode,   /**/ normalClasses, warningClasses, },
    [FormIconEnum.ie6]: { Icon: SymbolAppWebIeDot,  /**/ normalClasses, warningClasses: warningIeClasses, },
    [FormIconEnum.cat]: { Icon: SymbolCatalog,      /**/ normalClasses, warningClasses: "", },
};

export function formTypeToIcon(props: IconEnumWithWarning[]): TreenIconComponent {
    const { iconEnum: iconEnum1, warn: warn1 } = props[0] || {};
    const { iconEnum: iconEnum2, warn: warn2 } = props[1] || {};

    const fnSingleIcon: SVGIconComponent = ({ className, ...rest }: SVGIconTypeProps) => {
        const { Icon, normalClasses, warningClasses } = components[iconEnum1];
        const classes = warn1 ? warningClasses : normalClasses;
        return (
            <Icon className={classNames(classes, className)} {...rest} />
        );
    };

    const fnDoubleIcons: SVGIconComponent = ({ className, ...rest }: SVGIconTypeProps) => {
        const { Icon: IconLogin, normalClasses: norm1, warningClasses: warning1 } = components[iconEnum1];
        const classesLogin = warn1 ? warning1 : norm1;

        const { Icon: IconCpass, normalClasses: norm2, warningClasses: warning2 } = components[iconEnum2];
        const classesCpass = warn2 ? warning2 : norm2;

        return (
            <div className="relative h-4 w-6">
                <IconLogin className={classNames("absolute top-0 left-0 size-4", classesLogin, className)} {...rest} />
                <IconCpass className={classNames("absolute top-2 left-2 !size-2.5 !fill-muted", classesCpass, className)} />
            </div>
        );
    };

    const isSingle = props.length === 1 || (iconEnum1 === iconEnum2 && warn1 === warn2);

    return isSingle ? fnSingleIcon : fnDoubleIcons;
}

// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIE     className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIEText className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
