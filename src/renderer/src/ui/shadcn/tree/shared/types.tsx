/*avoid lucide-react dependency*/

//import { type LucideIcon as LucideIconType } from "lucide-react"; // https://github.com/shadcn-ui/ui/issues/355#issuecomment-1703767574 'G: shadcn tree'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface LucideProps extends ElementAttributes {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
}
type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
type LucideIconType = LucideIcon;
/*avoid lucide-react dependency*/

export type DataItemNavigation<T> =
    & {
        [K in keyof T]: T[K];
    }
    & {
        children?: DataItemNavigation<T>[];
    };

export type TreenIconComponent = LucideIconType | SVGIconComponent;

export type DataItemCore = {
    id: string | number;        // unique id
    name: string;               // text to display in tree
    icon?: TreenIconComponent;  // icon component
};

// export type DataItem = DataItemNavigation<DataItemCore>;
export type DataItemNav = DataItemNavigation<any>;

export const AttrTreeId = "data-tree-id";
export const AttrTreeFolder = "data-tree-folder";
export const AttrTreeFolderTrigger = "data-tree-folder-trigger";
export const TypeTreeFolder = "folder";
export const TypeTreeFolderTrigger = "folder-trigger";
