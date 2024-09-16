import { FormIdx } from '@/store/manifest';

export function NoFileds({ formType }: { formType: FormIdx; }) {
    const label =
        formType === FormIdx.login
            ? "No login form"
            : "No password change form";

    return (
        <div className="px-4 text-xs text-mani-title/30 select-none">
            {label}
        </div>
    );
}
