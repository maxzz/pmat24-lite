import { type PluginDataCallback } from "./9-types";
import { type WindowControlsCollectProgress } from ".";

export type ManifestForWindowCreatorParams = {
    hwnd: string;
    wantXml: boolean;
};

export type ManifestCreationDataResult = {
    type: 'data';
    xml: string;                   // string in xml or json format depending on ManifestForWindowCreatorParams.wantXml
};
export type ManifestCreationError = { // TODO: This should not be here. It is returned from callback.  
    type: 'error';
    error: BrowserExtErrors;
};

export type BrowserExtErrors =
    | 'noBrExt'                    // No extension detected
    | 'obsoleteBrExt'              // Obsolete extension detected (DPAgent is OK but the extension has not replied)
    | 'incompatiblePM'             // DPAgent has not replied
    | 'noControls';                // Desktop app does not have any editable controls

export type ManifestForWindowCreatorResult = WindowControlsCollectProgress | ManifestCreationError | ManifestCreationDataResult;


export interface ManifestForWindowCreator {
    new(): ManifestForWindowCreator;
    create(manifestForWindowCreatorParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

// export type ManifestForWindowCreatorFinalAfterParse =
//     | ManifestCreationError
//     | string;   // xml string if started with '<' character
