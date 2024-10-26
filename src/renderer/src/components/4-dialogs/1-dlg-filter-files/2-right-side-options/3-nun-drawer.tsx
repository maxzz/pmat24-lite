import { Button } from "@ui/shadcn";
import * as Dr from "@ui/shadcn/drawer";
import { DrawerItems } from "./1-drawer-items";

export function OptionsDrawer() {
    return (
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
    );
}
