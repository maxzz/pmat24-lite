import { Button } from "@ui/shadcn";
import * as Dr from "@ui/shadcn/drawer";
import { CheckAscending } from "./3-order";
import { CheckSortBy } from "./4-sort-by";
import { DrawerItems } from "./2-drawer-items";

export function FilterOptions() {
    return (
        <div className="flex flex-col gap-2">
            <Dr.Drawer shouldScaleBackground={false}>
                <Dr.DrawerTrigger asChild>
                    <Button variant="outline" className="font-normal">
                        Fiter options
                    </Button>
                </Dr.DrawerTrigger>

                <Dr.DrawerContent className="mx-auto py-4 w-1/2 max-w-sm rounded" hiddenTitle="Filter options">
                    <div className="grid place-content-center">
                        <DrawerItems />
                    </div>
                </Dr.DrawerContent>
            </Dr.Drawer>

            <CheckAscending />
            <CheckSortBy />

            {/* <Button variant="outline" className="font-normal">
                Sort options
            </Button> */}
        </div>
    );
}
