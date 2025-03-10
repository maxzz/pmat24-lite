import { type Base64String, type PluginDataCallback, type ImageFormatType } from "./9-types";

// Get Icon

export type WindowIconGetterParams = {
    hwnd: string;
    imageFormat: ImageFormatType;
};

export type WindowIconGetterResult = {
    data: Base64String;
    type: ImageFormatType;
};

/**
 * Class for getting window icon. Instantiate once and call getIcon multiple times.
 *
 * During instantiation it internally starts GDI Plus. So, do not create/destruct this class multiple times,
 * it will be expensive.

 * Usage:
 * let getter = new WindowIconGetter();
 * let [iconBinaryBmp, iconTypeBmp] = await getter.getIcon(0x1114C, 'png');
 */

export interface WindowIconGetter {
    new(): WindowIconGetter;
    getWindowIcon(windowIconGetterParamsParams: string, cb: PluginDataCallback): void;
}
