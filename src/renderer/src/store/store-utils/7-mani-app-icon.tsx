import { TreenIconType } from "@/ui/shadcn/tree";
import { SymbolAppWebChrome, SymbolAppWin } from "@/ui/icons";
import { classNames } from "@/utils";
import { AppWindow } from "lucide-react";

export const enum AppIconType {
    web,
    win,
    webWarning,
    winWarning,
}

// function AppIcon({ TreenIcon, className, ...rest }: SVGIconTypeProps & { TreenIcon: TreenIconType }) {
//     return <TreenIcon {...rest} />;
// }

const aa = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames("", className)} {...rest} />

export function appIcon(iconType: AppIconType): TreenIconType {
    switch (iconType) {
        case AppIconType.web:
        case AppIconType.webWarning: {
            const warning = iconType === AppIconType.webWarning;
            const warningClasses = warning ? "text-red-500" : "text-muted-foreground";
            return aa;
            // return ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames(warningClasses, className)} {...rest} />;
            // return AppIcon({ TreenIcon: SymbolAppWebChrome, className: warningClasses });
        }
        case AppIconType.win:
            // return AppWindow;
            return SymbolAppWin;
        case AppIconType.winWarning: {
            const warningClasses = "text-red-500";
            return ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWin className={classNames(warningClasses, className)} {...rest} />;
        }
        default: {
            const _exhaustiveCheck: never = iconType;
            return _exhaustiveCheck;
        }
    }
}
