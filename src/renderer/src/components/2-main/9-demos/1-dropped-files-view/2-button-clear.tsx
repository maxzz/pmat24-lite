import { useSetAtom } from 'jotai';
import { deliveredAtom } from '@/store';
import { Button } from '@/ui';

export function ButtonClear() {
    const setFilesContent = useSetAtom(deliveredAtom);
    return (
        <Button variant="outline" size="sm" onClick={() => setFilesContent([])}>
            Clear
        </Button>
    );
}
