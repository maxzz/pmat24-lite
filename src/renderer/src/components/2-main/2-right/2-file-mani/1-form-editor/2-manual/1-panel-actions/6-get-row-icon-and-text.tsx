import { IconField as IconFld, IconKey, IconPos, IconDelay as IconDly } from "@/ui/icons";
import { ChunkKey } from "@/store/manifest";
import { ReactNode } from "react";

export function getRowIconAndText(type: ChunkKey | undefined): { icon: ReactNode; name: string; } {
    if (!type) {
        return { icon: null, name: '' };
    }

    switch (type) {
        case 'fld': /**/ return { name: "Field"     /**/, icon: <IconFld /**/ className="ml-2 size-4" /> };
        case 'kbd': /**/ return { name: "Keystroke" /**/, icon: <IconKey /**/ className="ml-2 size-4" /> };
        case 'pos': /**/ return { name: "Position"  /**/, icon: <IconPos /**/ className="ml-2 size-4 mt-1" /> };
        case 'dly': /**/ return { name: "Delay"     /**/, icon: <IconDly /**/ className="ml-2 size-4" /> };
        default: {
            const really: never = type;
            return { icon: null, name: '' };
        }
    }
}

//TODO: use 1-row-parts instead of this file
