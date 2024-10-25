import { OptionsDrawer } from "./2-drawer";
import { CheckAscending } from "./3-order";
import { CheckSortBy } from "./4-sort-by";

export function FilterOptions() {
    return (
        <div className="flex flex-col gap-2">
            <OptionsDrawer />

            <CheckAscending />
            <CheckSortBy />

            {/* <Button variant="outline" className="font-normal">
                Sort options
            </Button> */}
        </div>
    );
}
