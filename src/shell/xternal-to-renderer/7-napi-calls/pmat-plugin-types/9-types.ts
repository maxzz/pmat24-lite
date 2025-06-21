// Base types

export type Base64String = string;

export type ImageFormatType = 'png' | 'jpg';

export type PointXY = {            // Point with 2 numbers, it can be client or screen coordinates
    x: number;
    y: number;
};

export type Rect4 = {              // Rectangle with 4 numbers, it can be client or screen coordinates
    left: number;
    right: number;
    top: number;
    bottom: number;
};

// Error types

export type BrowserExtErrors =
    | 'noBrExt'                    // No extension detected
    | 'obsoleteBrExt'              // Obsolete extension detected (DPAgent is OK but the extension has not replied)
    | 'incompatiblePM'             // DPAgent has not replied
    | 'noControls';                // Desktop app does not have any editable controls

export type Win32Errors =
    | 'no.hwnd'                     // No hwnd found
    | 'no.init'                     // Call not initialized`
    | 'bad.rect'                    // Rectangle is too small for the border width.
    | 'bad.color'                   // Selected color cannot be used.
    | 'internal';                   // Internal error

// Callback types

export type PluginDataCallback<T> = (err: string, data: string) => void;
export type PluginErrorCallback = (err: string) => void;

// Clarification types

export type OKIfEmptyString = string | '';
