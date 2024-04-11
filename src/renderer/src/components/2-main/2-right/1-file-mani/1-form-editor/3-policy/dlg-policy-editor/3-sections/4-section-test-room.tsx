import { Atomize } from "@/util-hooks";
import { PolicyUi } from "../0-all/0-create-ui-atoms";
import { Input } from "../4-constrols";

export function SectionTestRoom({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <Input className="" />

                <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">
                    Verify
                </button>
            </div>

            <div className="flex items-center space-x-2">
                <Input className="" />

                <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">
                    Generate
                </button>
            </div>
        </div>
    );
}
