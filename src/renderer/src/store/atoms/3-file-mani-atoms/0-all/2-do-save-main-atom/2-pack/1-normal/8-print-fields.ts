import { type Mani, type Meta } from "@/store/manifest";

export function printFields(label: string, fields: { meta: Meta.Field; newMani: Mani.Field | undefined; }[]) {
    const colors: string[] = [];
    const items: string[] = [];

    function add({ name, value, colorValue, colorName }: { name: string; value: string; colorValue?: string; colorName?: string; }) {
        items.push(`%c${name}%c${value}`);
        colors.push(colorName || 'color: gray');
        colors.push(colorValue || 'color: #d58e00');
    }

    fields.forEach(
        (field, idx) => {
            if (!field.newMani) {
                return;
            }
            const m = field.newMani;

            items.push('   ');
            add({ name: ' type: ',  /**/ value: `${m.type.padEnd(6, ' ')}`,         /**/ colorValue: m.type === 'button' ? 'color: #8eacf8' : 'color: #888888' });
            add({ name: ' useIt: ', /**/ value: m.useit ? 'true' : '    ',          /**/ colorValue: m.useit ? 'color: #00a000' : 'color: #ababab' });
            add({ name: ' uuid: ',  /**/ value: `${field.meta.uuid}`,               /**/ colorValue: 'color: #ababab; font-size: 0.5rem' });
            add({ name: ' name: ',  /**/ value: `${m.displayname || '???no name'}`, /**/ colorValue: 'color: var(--console-color-yellow); font-size: 0.6rem' });
            add({ name: '',         /**/ value: '',                                 /**/ colorValue: 'color: black' }); // the last dummy item to fix font-size
            idx !== fields.length - 1 && items.push('\n');
        }
    );

    console.log(`${label}\n${items.join('')}`, ...colors);
}
