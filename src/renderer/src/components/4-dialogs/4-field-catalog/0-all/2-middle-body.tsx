import { type PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import { doCloseFldCatDialogAtom, fldCatItemsAtom } from "@/store";
import { FldCatItemsGrid } from "../1-items-grid";
import { SelectedItemBody } from "../2-selected-item-props/0-all";
import { Button } from "@/ui";
import { classNames } from "@/utils";

const subSectionClasses = 'text-sm text-foreground bg-background border-border border-b';

function TitleItems() {
    return (
        <div className={classNames(subSectionClasses, "mb-1 flex items-center justify-between")}>
            <div>
                Catlog items
            </div>

            <Button className="mb-1 aspect-square" variant="outline" size="xs">
                +
            </Button>
        </div>
    );
}



function TitleProps() {
    return (
        <div className={subSectionClasses}>
            Selected item
        </div>
    );
}

type MiddleBodyProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
};

const dlgHeaderClasses = 'my-1 text-xs font-thin';

export function MiddleBody({ selectedItemAtom }: MiddleBodyProps) {
    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const totalItems = useAtomValue(fldCatItemsAtom).length;

    return (<>
        <TitleItems />
        <div className="h-[50vh] min-h-[120px]">
            <FldCatItemsGrid
                selectedItemAtom={selectedItemAtom}
                onDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
            />
        </div>

        <TitleProps />
        <SelectedItemBody selectedItemAtom={selectedItemAtom} />

        <div className={dlgHeaderClasses}>
            {totalItems} item{totalItems === 1 ? '' : 's'} in field catalog
        </div>
    </>);
}
