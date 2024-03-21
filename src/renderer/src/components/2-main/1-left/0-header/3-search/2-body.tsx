import * as D from "@/ui/shadcn/dialog";
import { Input } from "@/ui/shadcn";
import { IconFilter, IconSearch } from "@/ui/icons";
import { useAtom } from "jotai";
import { searchFilterData } from "@/store";
import { FilteredFilesList } from "./3-files-list";

export function DialogFilterBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const [text, setText] = useAtom(searchFilterData.textAtom);
    return (<>
        <div className="text-xs grid gap-4">

            <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 p-px size-4" />
                <Input
                    className="pl-9"
                    value={text}
                    onKeyDown={(e) => {
                        if (!text) {
                            return;
                        }

                        if (e.key === 'Escape') {
                            e.preventDefault();
                            setText('');
                        }

                        if (e.key === 'Enter') {
                            e.preventDefault();
                            setIsOpen(false);
                        }

                    }}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search for manifests"
                />
            </div>

            <FilteredFilesList />

        </div>
    </>);
}
