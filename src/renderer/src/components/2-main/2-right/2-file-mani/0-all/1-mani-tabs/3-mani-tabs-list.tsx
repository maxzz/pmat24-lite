import { Button, TabsList, TabsTrigger } from "@/ui";

export function ManiTabsList({ hasCpass, hasChanges }: { hasCpass: boolean; hasChanges: boolean; }) {
    const cpassLabel =
        hasCpass
            ? "Password change"
            : <div><span className="text-foreground">No</span> password change</div>;

    return (
        <div className="flex items-center justify-between">
            <TabsList>
                <TabsTrigger value="options" className="text-xs" title="Manifest options">Options</TabsTrigger>
                <TabsTrigger value="login" className="text-xs" title="Login fields">Login</TabsTrigger>
                <TabsTrigger value="cpass" className="text-xs" title="Password change fields">{cpassLabel}</TabsTrigger>
            </TabsList>

            {hasChanges && (
                <Button>Save</Button>
            )}
        </div>
    );
}
