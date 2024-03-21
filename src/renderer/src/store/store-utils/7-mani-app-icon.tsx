import { AppWindow } from "lucide-react";
import { SymbolAppWebChrome } from "@/ui/icons";
import { TreenIconType } from "@/ui/shadcn/tree";

export const enum AppIconType {
    web,
    win,
}

export function appIcon(iconType: AppIconType): TreenIconType {
    switch (iconType) {
        case AppIconType.web:
            return SymbolAppWebChrome;
        case AppIconType.win:
            return AppWindow;
            // return SymbolAppWin;
        default: {
            const _exhaustiveCheck: never = iconType;
            return _exhaustiveCheck;
        }
    }
}
