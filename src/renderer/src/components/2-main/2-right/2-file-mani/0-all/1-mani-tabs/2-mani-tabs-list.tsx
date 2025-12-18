import { TabsList, TabsTrigger } from "@/ui";
import { maniTabValue } from "@/store/5-3-right-panel/2-mani-active-tab";

export function ManiTabsList({ hasCpass }: { hasCpass: boolean; }) {
    const cpassLabel = hasCpass
        ? "Password change"
        : <div><span className="text-foreground">No</span> password change</div>;

    return (
        <div className="flex items-center justify-between">
            <TabsList>
                <TabsTrigger value={maniTabValue.options} className="text-xs select-none" title="Manifest options">Options</TabsTrigger>
                <TabsTrigger value={maniTabValue.login} className="text-xs select-none" title="Login fields">Login</TabsTrigger>
                <TabsTrigger value={maniTabValue.cpass} className="text-xs select-none" title="Password change fields">{cpassLabel}</TabsTrigger>
            </TabsList>
        </div>
    );
}
