import { useEffect, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Matching } from "@/store/manifest";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

export function useIsShowExample(options: FormOptionsState.AllAtoms): boolean | undefined {
    const isShowExample = useSetAtom(isShowExampleAtom);
    const [showExample, setShowExample] = useState<boolean | undefined>(false);

    const how = useAtomValue(options.howAtom);
    const o = useAtomValue(options.p2Detect.ourlAtom);
    const r = useAtomValue(options.p2Detect.rurlAtom);

    useEffect(
        () => {
            setShowExample(isShowExample(options));
        }, [options, how, o, r]
    );

    return showExample;
}

const isShowExampleAtom = atom(
    null,
    (get, set, options: FormOptionsState.AllAtoms): boolean | undefined => {
        const how = get(options.howAtom);
        if (how === Matching.How.regex) {
            const o = get(options.p2Detect.ourlAtom).data;
            const r = get(options.p2Detect.rurlAtom).data;
            return o === r || !r;
        }
    }
);

export function ShowExampleText() {
    return (<>
        <div className="mt-1">
            The regular expression and the original URL are an exact match or the regular expression is empty, so the regular expression is useless.
        </div>

        <div className="mt-2">
            You can define the regular expression as any part of the original URL, but the website domain will be taken from the original URL.
            For example, if the original URL is <span className={exampleClasses}>https://login.example.com</span> and the regular expression is <span className={exampleClasses}>login</span>,
            the domain in this case would be <span className={exampleClasses}>example.com</span>, and the login form would match <span className={exampleClasses}>login.example.com</span>, but not <span className={exampleClasses}>admin.example.com</span>.
            This allows you to determine where the form will be used.
        </div>
    </>);
}

const exampleClasses = "text-blue-500";
