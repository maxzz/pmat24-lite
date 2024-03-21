import { type LucideIcon as LucideIconType } from "lucide-react"; // https://github.com/shadcn-ui/ui/issues/355#issuecomment-1703767574 'G: shadcn tree'
import { HTMLAttributes, SVGAttributes } from "react";

export type DataItemNavigation<T> =
    & {
        [K in keyof T]: T[K];
    }
    & {
        children?: DataItemNavigation<T>[];
    };

export type TreenIconType = LucideIconType;

export type DataItemCore = {
    id: string | number;
    name: string;
    // icon?: TreenIconType;
    icon?: TreenIconType | ((props: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) => JSX.Element);
};

// export type DataItem = DataItemNavigation<DataItemCore>;
export type DataItemNav = DataItemNavigation<any>;

export const AttrTreeId = "data-tree-id";
export const AttrTreeFolder = "data-tree-folder";
export const AttrTreeFolderTrigger = "data-tree-folder-trigger";
export const TypeTreeFolder = "folder";
export const TypeTreeFolderTrigger = "folder-trigger";
