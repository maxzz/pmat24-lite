import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Matching } from "@/store/manifest";
import { FormOptionsState } from "@/store/1-atoms/2-file-mani-atoms/4-options";
// import { type UrlsEditorDataAtom } from "../0-all";
// import { RadioGroupTooltips } from "./7-ui-radio-group-tooltips";
// import { MatchingCheckboxes } from "./7-ui-matching-checkboxes";
// import { MatchUrlInput } from "./5-match-url-input";
// import { FinalMatchUrl } from "./6-final-match-url";
// import { setUrlsEditorDataAtom } from "../0-all/9-set-atoms";
// import { MatchUrlInputLabel } from "./5-match-url-caption";
// import { ThesameAsOriginalUrl } from "../0-all/5-the-same-as-original";

export function MatchHow({ options }: { options: FormOptionsState.AllAtoms; }) {
    const [errorHint, setErrorHint] = useState(''); // 'This pattern is not valid'
    
    const detect = options.p2Detect

    const o = useAtomValue(detect.ourlAtom);
    const m = useAtomValue(detect.murlAtom);
    const url = useAtomValue(detect.rurlAtom);
    const how = useAtomValue(options.howAtom);
    const opt = useAtomValue(options.optAtom);
    const isTheSame = o === url;

    // const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);

    // function onChangeHow(v: Matching.How) {
    //     setUrlsEditorData({ urlsEditorDataAtom, how: v });
    // }

    // function isOptionChecked(option: Matching.Options) {
    //     return (opt & option) !== 0;
    // }

    // function onOptionChange(checked: boolean, changedOption: Matching.Options) {
    //     let opt2 = checked ? opt | changedOption : opt & ~changedOption;
    //     setUrlsEditorData({ urlsEditorDataAtom, opt: opt2 });
    // }

    // function onUrlChange(url: string) {
    //     setUrlsEditorData({ urlsEditorDataAtom, url });
    // }

    // const disabled = how === Matching.How.undef;

    return (<>
    </>);
}

        // <div className="flex space-x-4">
        //     {/* Radio buttons: how match */}
        //     <RadioGroupTooltips value={how} setValue={onChangeHow} />

        //     {/* Checkboxes: match case options. Shown only for legacy manifests to allow reset them to none */}
        //     {!!urlsEditorData.fromFileMatchData.opt && (
        //         <MatchingCheckboxes isChecked={isOptionChecked} onCheckboxChange={onOptionChange} />
        //     )}
        // </div>

        // <div className={classNames("mt-2 mb-0.5 flex items-center justify-between gap-x-1", disabled && 'opacity-75')}>
        //     <MatchUrlInputLabel how={how} />
        //     <ThesameAsOriginalUrl className="ml-5 text-xs" isTheSame={isTheSame} />
        // </div>

        // <MatchUrlInput rawUrl={url} title={m} onUrlChange={onUrlChange} errorHint={errorHint} disabled={disabled} />

        // <FinalMatchUrl url={m} />
