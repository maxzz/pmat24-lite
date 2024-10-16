import { type PrimitiveAtom, useSetAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import { doCloseFldCatDialogAtom } from "@/store";
import { FldCatItemsGrid } from "../2-items-grid";
import { SelectedItemBody } from "./4-selected-item-body";
import { Button } from "@/ui";
import { classNames } from "@/utils";

const subSectionClasses = 'text-sm text-foreground bg-background border-border border-b';

function SubTitleA() {
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

function SubTitleB() {
    return (
        <div className={subSectionClasses}>
            Selected item
        </div>
    );
}

type MiddleBodyProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
};

export function MiddleBody({ selectedItemAtom }: MiddleBodyProps) {
    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    return (<>
        <SubTitleA />
        <div className="h-[50vh] min-h-[120px]">
            <FldCatItemsGrid
                selectedItemAtom={selectedItemAtom}
                onDoubleClick={(item: CatalogItem) => closeFldCatDialog({ fldCatItem: item })}
            />
        </div>

        <SubTitleB />
        <SelectedItemBody selectedItemAtom={selectedItemAtom} />
    </>);
}
