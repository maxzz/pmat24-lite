import { PrimitiveAtom, useAtomValue } from "jotai";
import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { ManiAtoms, OptionsState } from "../../../0-all/0-create-ui-atoms";
import { Section } from "../4-controls";
import { Part1General, Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { rightPanelContentAtom } from "@/store";

export function ManiSection4_FormOptions({ maniAtoms, fileUsAtom, formIdx }: { maniAtoms: ManiAtoms; fileUsAtom: FileUsAtom; formIdx: FormIdx; }) {
    // const fileUs = useAtomValue(fileUsAtom);
    // const metaForm = fileUs.meta?.[formIdx];

    const fileUs = useAtomValue(fileUsAtom);

    const atoms = OptionsState.createAtoms(fileUs, fileUsAtom, formIdx,
        ({ get, set }) => {
            //console.log('options changed', field, field.mani.displayname);
            OptionsState.debouncedCombinedResultFromAtoms(atoms, get, set);
        }
    );

    const isWeb = fileUs.stats.isWeb; // TODO: why this is not per form?

    return (
        <div className="mr-1 mb-4 font-light text-mani-foreground select-none grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 space-y-1">
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

export function TabOptions({ maniAtoms, fileUs, formIdx }: { maniAtoms: ManiAtoms; fileUs: FileUs; formIdx: FormIdx; }) {

    const fileUs2 = useAtomValue(rightPanelContentAtom);
    if (!fileUs2) {
        return null;
    }

    const fileUsAtom = rightPanelContentAtom as PrimitiveAtom<FileUs>; // to omit null

    return (
        <div className="ml-4 mr-1">
            <ManiSection4_FormOptions maniAtoms={maniAtoms} fileUsAtom={fileUsAtom} formIdx={formIdx} />
        </div>
    );
}
