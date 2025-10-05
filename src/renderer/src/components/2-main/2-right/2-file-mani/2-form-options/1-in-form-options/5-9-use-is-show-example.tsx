import { useEffect, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { SymbolWarning } from "@/ui/icons";
import { Matching } from "@/store/manifest";
import { type RowInputStateAtom } from "@/ui/local-ui/1-input-validate/9-types";
import { type FormOptionsState } from "@/store/2-file-mani-atoms/3-options";

export function useIsShowExample(options: FormOptionsState.AllAtoms): boolean | undefined {
    const isShowExample = useSetAtom(isShowExampleAtom);
    const [showExample, setShowExample] = useState<boolean | undefined>(false);

    const how = useAtomValue(options.murl_howAtom);
    const r = useAtomValue(options.murl_regexAtom);
    const o = useAtomValue(options.p2Detect.ourlAtom);

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
        const how = get(options.murl_howAtom);
        if (how === Matching.How.regex) {
            const r = get(options.murl_regexAtom).data;
            const o = get(options.p2Detect.ourlAtom).data;
            return o === r || !r;
        }
    }
);

/**/
// sonet45: 'How to find all text for localization in this project. Show me small example on the open file in editor.'
// Example localization approach - create a translations object/module:

export function ShowExampleText({ murl_regexAtom }: { murl_regexAtom: RowInputStateAtom; }) {
    const isEmpty = useAtomValue(murl_regexAtom).data === '';
    return (<>
        <div className="mt-1">
            <SymbolWarning className="size-4 text-orange-600 dark:text-orange-400" />
            {isEmpty ? t.regexEmpty : t.regexMatchesUrl}
        </div>

        <div className="mt-2">
            {t.regexExplanation} {t.examplePrefix} <span className={exampleClasses}>https://login.example.com</span> {t.exampleMiddle} <span className={exampleClasses}>login</span>,
            {t.exampleDomain} <span className={exampleClasses}>example.com</span>, {t.exampleMatches} <span className={exampleClasses}>login.example.com</span>, {t.exampleNotMatch} <span className={exampleClasses}>admin.example.com</span>.
            {t.exampleSuffix}
        </div>
    </>);
}

const t = {
    regexEmpty: 'The regular expression is empty, so the regular expression is useless.',
    regexMatchesUrl: 'The regular expression and the original URL are an exact match, so the regular expression is useless.',
    regexExplanation: 'You can define the regular expression as any part of the original URL, but the website domain will be taken from the original URL.',
    examplePrefix: 'For example, if the original URL is',
    exampleMiddle: 'and the regular expression is',
    exampleDomain: 'the domain in this case would be',
    exampleMatches: 'and the login form would match',
    exampleNotMatch: 'but not',
    exampleSuffix: 'This allows you to determine where the form will be used.',
};
/**/

/** /
export function ShowExampleText({ murl_regexAtom }: { murl_regexAtom: RowInputStateAtom; }) {
    const isEmpty = useAtomValue(murl_regexAtom).data === '';
    return (<>
        <div className="mt-1">
            <SymbolWarning className="size-4 text-orange-600 dark:text-orange-400" />
            {isEmpty
                ? 'The regular expression is empty, so the regular expression is useless.'
                : 'The regular expression and the original URL are an exact match, so the regular expression is useless.'
            }
        </div>

        <div className="mt-2">
            You can define the regular expression as any part of the original URL, but the website domain will be taken from the original URL.
            For example, if the original URL is <span className={exampleClasses}>https://login.example.com</span> and the regular expression is <span className={exampleClasses}>login</span>,
            the domain in this case would be <span className={exampleClasses}>example.com</span>, and the login form would match <span className={exampleClasses}>login.example.com</span>, but not <span className={exampleClasses}>admin.example.com</span>.
            This allows you to determine where the form will be used.
        </div>
    </>);
}
/**/

const exampleClasses = "text-blue-500";
