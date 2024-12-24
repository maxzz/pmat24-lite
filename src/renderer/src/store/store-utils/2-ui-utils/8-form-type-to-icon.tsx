import { TreenIconComponent } from "@/ui/shadcn/tree";
import { IconEnumWithWarning } from "./7-file-us-to-app-type";
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
const warningClasses = "text-red-500 fill-red-300 opacity-75";

const components: IconsTable = {
    [FormIconEnum.web]: { Icon: SymbolAppWebChrome, /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [FormIconEnum.win]: { Icon: SymbolAppWin,       /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [FormIconEnum.man]: { Icon: SymbolManualMode,   /**/ normalClasses: normalClasses, warningClasses: warningClasses },
    [FormIconEnum.ie6]: { Icon: SymbolAppWebIeDot,  /**/ normalClasses: normalClasses, warningClasses: "" },
    [FormIconEnum.cat]: { Icon: SymbolCatalog,      /**/ normalClasses: normalClasses, warningClasses: "" },
};

export function formTypeToIcon(props: IconEnumWithWarning[]): TreenIconComponent {
    const { iconEnum: iconEnum1, uiOptShowIeWarnIcon: uiOptShowIeWarnIcon1 } = props[0] || {};
    const { iconEnum: iconEnum2, uiOptShowIeWarnIcon: uiOptShowIeWarnIcon2 } = props[1] || {};

    const fn1: SVGIconComponent = ({ className, ...rest }: SVGIconTypeProps) => {
        const { Icon, normalClasses, warningClasses } = components[iconEnum1];
        const classes = uiOptShowIeWarnIcon1 ? warningClasses : normalClasses;
        return (
            <Icon className={classNames(classes, className)} {...rest} />
        );
    };

    const fn2: SVGIconComponent = ({ className, ...rest }: SVGIconTypeProps) => {
        const { Icon: Icon1, normalClasses: n1, warningClasses: w1 } = components[iconEnum1];
        const classes1 = uiOptShowIeWarnIcon1 ? w1 : n1;

        const { Icon: Icon2, normalClasses: n2, warningClasses: w2 } = components[iconEnum2];
        const classes2 = uiOptShowIeWarnIcon2 ? w2 : n2;

        return (
            <div className="relative size-4 w-5">
                <Icon1 className={classNames("absolute top-0 left-0", classes1, className)} {...rest} />
                <Icon2 className={classNames("absolute top-2 left-2.5 size-2 !fill-muted", classes2, className)} {...rest} />
            </div>
        );
    };

    const isSingle = props.length === 1 || (iconEnum1 === iconEnum2 && uiOptShowIeWarnIcon1 === uiOptShowIeWarnIcon2);

    return isSingle ? fn1 : fn2;
}

// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIE     className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
// const WebIe = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebIEText className={classNames("text-muted-foreground size-3.5 stroke-1", className)} {...rest} />;
