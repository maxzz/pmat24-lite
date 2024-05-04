import { Button, notImplYet } from "@/ui";

export function NoPasswordsForPolies() {
    return (
        <div className="px-4 pt-1 pb-4 flex items-center gap-2">
            <div className="">
                1. No password fields to specified policy.
                2. No policy specified.
            </div>

            <Button size="sm" {...notImplYet}>Create policy</Button>
        </div>
    );
}

//TODO: this is incomplete. one case no password fields, other case password fields but no policy fields
