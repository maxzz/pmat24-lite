export type Base64String = string;

export type ImageFormatType = 'png' | 'jpg';

export type TargetClientRect = { // TODO: Rename, iis t not necessarily client rect.
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type PluginDataCallback<T> = (err: string, data: string) => void;
export type PluginErrorCallback = (err: string) => void;
