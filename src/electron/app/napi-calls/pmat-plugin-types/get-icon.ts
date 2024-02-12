import { PluginDataCallback } from ".";

// Get Icon

export type IconFormatType = 'png' | 'jpeg' | 'bmp';
export type Base64String = string;

export type WindowIconGetterParams = {
    hwnd: string;
    iconFormat: IconFormatType;
};

export type WindowIconGetterResult = {
    data: Base64String;
    type: IconFormatType;
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
