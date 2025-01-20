export type Base64String = string;

export type ImageFormatType = 'png' | 'jpg';

export type TargetClientRect = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type PluginDataCallback = (err: string, data: string) => void;
export type PluginErrorCallback = (err: string) => void;
