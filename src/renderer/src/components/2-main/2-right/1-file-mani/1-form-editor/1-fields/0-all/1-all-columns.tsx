import { FormIdx, FileUs } from '@/store/store-types';
import { ManiSection1_Fields } from './3-table-grid';
import { NoFileds } from './5-no-fileds';

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
