import { FileUs, FileUsAtomType, FormIdx } from "@/store/store-types";
import { PrimitiveAtom, useAtomValue } from 'jotai';
import { createAtoms, debouncedCombinedResultFromAtoms } from './0-create-atoms';
import { Section } from '../4-controls';
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from '../3-sections';
import { rightPanelSelectedContentAtom } from "@/store";

export function ManiSection4_FormOptions({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    // const fileUs = useAtomValue(fileUsAtom);
    // const metaForm = fileUs.meta?.[formIdx];

    const atoms = createAtoms('',
        ({ get, set }) => {
            //console.log('options changed', field, field.mani.displayname);
            debouncedCombinedResultFromAtoms(atoms, get, set);
        }, fileUsAtom, formIdx
    );

    const fileUs = useAtomValue(atoms.fileUsAtom);
    const isWeb = fileUs.stats.isWeb; // TODO: why this is not per form?

    return (
        <div className="mr-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 1gap-y-[4px] items-center font-light text-mani-foreground select-none">
            <Section label="General" />
            <Part1General atoms={atoms} />

            <Section label="Screen detection" />
            <Part2ScreenDetection atoms={atoms} />

            <Section label="Authentication" />
            <Part3Authentication atoms={atoms} />

            <Section label="Quick link" />
            <Part4QL atoms={atoms} />

            {!isWeb && (
                <>
                    <Section label="Password Manager Icon" />
                    <Part5PasswordManagerIcon atoms={atoms} />
                </>
            )}
        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?

export function TabOptions({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const fileUs2 = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs2) {
        return null;
    }

    const fileUsAtom = rightPanelSelectedContentAtom as PrimitiveAtom<FileUs>; // to omit null

    return (
        <div className="ml-4 mr-1">
            <ManiSection4_FormOptions fileUsAtom={fileUsAtom} formIdx={formIdx} />
        </div>
    );
}
