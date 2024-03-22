import { TreenIconType } from "@/ui/shadcn/tree";
import { SymbolAppWebChrome, SymbolAppWin, SymbolCatalog } from "@/ui/icons";
import { classNames } from "@/utils";
import { BookOpen } from "lucide-react";

export const enum AppIconType {
    web,
    win,
    webWarning,
    winWarning,
    cat,            // field catalog
}

const Web = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames("text-muted-foreground", className)} {...rest} />;

const WebWarning = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWebChrome className={classNames("text-red-500", className)} {...rest} />;

const WinWarning = ({ className, ...rest }: SVGIconTypeProps) => <SymbolAppWin className={classNames("text-red-500", className)} {...rest} />;

const Catalog = ({ className, ...rest }: SVGIconTypeProps) => <SymbolCatalog className={classNames("text-muted-foreground", className)} {...rest} />;

export function appIcon(iconType: AppIconType): TreenIconType {
    switch (iconType) {
        case AppIconType.web:
            return Web;
        case AppIconType.webWarning:
            return WebWarning;
        case AppIconType.win:
            return SymbolAppWin; // return AppWindow;
        case AppIconType.winWarning:
            return WinWarning;
        case AppIconType.cat:
            return Catalog;
        default: {
            const _exhaustiveCheck: never = iconType;
            return _exhaustiveCheck;
        }
    }
}
