import { Button, TabsList, TabsTrigger } from "@/ui";

export function ManiTabsList({ hasCpass, hasChanges }: { hasCpass: boolean; hasChanges: boolean; }) {
    const label = hasCpass ? "Password change" : <div><span className="text-foreground">No</span> password change</div>;
    // const label = hasCpass ? 'Password change' : 'No password change';
    return (
        <div className="flex items-center justify-between">
            <TabsList>
                <TabsTrigger value="tab0" className="text-xs" title="Manifest options">Options</TabsTrigger>
                <TabsTrigger value="tab1" className="text-xs" title="Login fields">Login</TabsTrigger>
                <TabsTrigger value="tab2" className="text-xs" title="Password change fields">{label}</TabsTrigger>
            </TabsList>

            {hasChanges && (
                <Button>Save</Button>
            )}
        </div>
    );
}
