import { UISymbolDefsInject } from 'pm-manifest-icons';
import { DefFieldTypes } from 'pm-manifest-icons/src/symbols/field';

export * from 'pm-manifest-icons/src/symbols/field';

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefFieldTypes()}
        </UISymbolDefsInject>
    );
}
