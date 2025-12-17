import { SelectTm, SelectTmTextValue } from "@/ui/local-ui";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { SortBy } from "@/store/store-types";

export function CheckSortBy() {
    const { sortBy } = useSnapshot(appSettings.files.sortOrder);
    return (
        <div className="flex flex-col gap-0.5">
            <SelectTm items={sortByItems}
                value={sortBy.toString()}
                onValueChange={(value) => appSettings.files.sortOrder.sortBy = +value as SortBy}
            />
        </div>
    );
}

const sortByItems: SelectTmTextValue[] = [
    ['File index', SortBy.index.toString()],
    ['Website domain', SortBy.url.toString()],
    ['Login name', SortBy.loginName.toString()],
];
