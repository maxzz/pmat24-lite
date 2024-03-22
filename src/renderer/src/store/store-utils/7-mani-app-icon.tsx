import { TreenIconType } from "@/ui/shadcn/tree";
import { SymbolAppWebChrome, SymbolAppWin } from "@/ui/icons";
import { classNames } from "@/utils";

export const enum AppIconType {
    web,
    win,
    webWarning,
    winWarning,
}

export function appIcon(iconType: AppIconType): TreenIconType {
    switch (iconType) {
        case AppIconType.web:
        case AppIconType.webWarning: {
            const warning = iconType === AppIconType.webWarning;
            const warningClasses = warning ? "text-red-500" : "text-muted-foreground";
            return ({ className }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames(warningClasses, className)} />;
        }
        case AppIconType.win:
            // return AppWindow;
            return SymbolAppWin;
        case AppIconType.winWarning: {
            const warningClasses = "text-red-500";
            return ({ className }: SVGIconTypeProps) => <SymbolAppWin className={classNames(warningClasses, className)} />;
        }
        default: {
            const _exhaustiveCheck: never = iconType;
            return _exhaustiveCheck;
        }
    }
}
