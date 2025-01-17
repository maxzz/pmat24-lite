import { type PluginDataCallback } from "./9-types";
import { type WindowControlsCollectProgress } from ".";

export type ManifestForWindowCreatorParams = {
    hwnd: string;
    wantXml: boolean;
};

export type ManifestForWindowCreatorResult = WindowControlsCollectProgress | object | string;

export interface ManifestForWindowCreator {
    new(): ManifestForWindowCreator;
    create(manifestForWindowCreatorParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

export type ManifestForWindowCreatorFinalAfterParse =
    | object    // TODO: define manifest fields
    | string;   // xml string if started with '<' character
