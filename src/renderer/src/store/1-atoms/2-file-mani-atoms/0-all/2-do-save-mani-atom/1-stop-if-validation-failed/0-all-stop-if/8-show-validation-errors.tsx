import { toast } from "sonner";
import { appSettings } from "@/store/9-ui-state/0-local-storage-app";
import { type VerifyError } from "../../../../9-types";

export function showValidationErrors({ fromTab, verifyErrors }: { fromTab: string | undefined; verifyErrors: VerifyError[]; }): void {
    if (fromTab) {
        appSettings.right.mani.activeTab = fromTab;
    }

    const messages = verifyErrors.map(
        (err, idx) => {
            return <div key={idx}>{err.error}</div>;
        }
    );

    toast.error(<div className="flex flex-col">{messages}</div>);
}
