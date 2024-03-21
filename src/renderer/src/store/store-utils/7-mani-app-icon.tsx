import { SymbolAppWebChrome, SymbolAppWin } from "@/ui/icons";
import { AppIconType } from "../store-types";

export function appIcon(iconType: AppIconType): SVGIconType {
    switch (iconType) {
        case AppIconType.web:
            return SymbolAppWebChrome;
        case AppIconType.win:
            return SymbolAppWin;
        default: {
            const _exhaustiveCheck: never = iconType;
            return _exhaustiveCheck;
        }
    }
}
