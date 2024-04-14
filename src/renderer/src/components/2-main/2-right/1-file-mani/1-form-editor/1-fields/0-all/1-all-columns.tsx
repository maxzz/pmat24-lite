import { FormIdx, FileUs } from '@/store/store-types';
import { ManiSection1_Fields } from './3-table-grid';

function NoFileds({ formType }: { formType: FormIdx; }) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return (
        <div className="px-4 text-xs text-mani-title/30 select-none">
            {label}
        </div>
    );
}

export function TabFields({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    
    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return <NoFileds formType={formIdx} />;
    }

    return (
        <div>
            <ManiSection1_Fields fields={metaForm.fields} />
        </div>
    );
}
