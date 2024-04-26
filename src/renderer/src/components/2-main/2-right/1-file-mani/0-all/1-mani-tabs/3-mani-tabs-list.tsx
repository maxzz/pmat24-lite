import { Button, TabsList, TabsTrigger } from "@/ui";

export function ManiTabsList({ hasCpass, hasChanges }: { hasCpass: boolean; hasChanges: boolean; }) {
    return (
        <div className="flex items-center justify-between">
            <TabsList>
                <TabsTrigger value="switch1" className="text-xs">Login</TabsTrigger>
                <TabsTrigger value="switch2" className="text-xs">{`${hasCpass ? 'Password change' : 'No password change'}`}</TabsTrigger>
            </TabsList>

            {hasChanges && (
                <Button>Save</Button>
            )}
        </div>
    );
}
