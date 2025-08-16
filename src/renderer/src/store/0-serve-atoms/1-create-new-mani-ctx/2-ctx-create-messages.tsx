import { type Setter } from "jotai";
import { doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { stateNapiAccess, setBuildState, splitTypedError, typedErrorToString, type TypedError } from "@/store/7-napi-atoms";

export function showMessage({ set, message, isError }: { set: Setter; message: string; isError?: boolean; }) {
    set(doAddNextToastIdAtom, toast[isError ? 'error' : 'info'](message, { position: "top-center" }));
}

export function printNewMani(newMani: string) {
    console.log(`%cNew mani:\n${newMani}`, "color:dimgray");
}

export function showBuildErrorReason(set: Setter) {
    if (!stateNapiAccess.buildError) {
        return;
    }

    const typedError = splitTypedError(stateNapiAccess.buildError);

    console.error(`'getXmlCreateFileUs' ${typedErrorToString(typedError)}`);

    if (typedError.typed === 'canceled-by-user') {
        showMessage({ set, message: 'Canceled' }); // OK but no need to show toast
    }
    else if (typedError.typed === 'too-many-controls') {
        showMessage({ set, message: 'Too many controls' });
    }
    else if (typedError.typed === 'build-error') {
        showMessage({ set, message: getErrorSubMessage(typedError) });
    }
    else if (typedError.extra) {
        showMessage({ set, message: typedError.extra, isError: true });
    } else {
        showMessage({ set, message: 'There are no input controls in the window' });
    }

    setBuildState({ error: '' });
}

function getErrorSubMessage(error: TypedError): string {
    switch (error.sub) {
        case 'incompatiblePM': {
            return 'HID Password Manager is not installed';
        }
        case 'noBrExt': {
            return 'HID Password Manager extension is not installed';
        }
        case 'obsoleteBrExt': {
            return 'Update HID Password Manager extension';
        }
        case 'noControls':
        default: {
            return 'Cannot access application content';
        }
    }
}
