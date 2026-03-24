import { doAddNextToastIdAtom } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { type TypedError, stateNapiAccess, setBuildState, splitTypedError, typedErrorToString } from "@/store/7-napi-atoms";

export function showNotice({ set, message, isError }: { set: Setter; message: string; isError?: boolean; }) {
    const id = notice[isError ? 'error' : 'info'](message, { position: "top-center" }); // show notice and append its id to the list of shown notices, so they can be dismissed at once.
    set(doAddNextToastIdAtom, id);
}

export function showNotice_BuildErrorReason(set: Setter) {
    if (!stateNapiAccess.buildError) {
        return;
    }

    const typedError = splitTypedError(stateNapiAccess.buildError);

    console.error(`'getXmlCreateFileUs' ${typedErrorToString(typedError)}`);

    if (typedError.typed === 'canceled-by-user') {
        showNotice({ set, message: 'Canceled' }); // OK but no need to show toast
    }
    else if (typedError.typed === 'too-many-controls') {
        showNotice({ set, message: 'Too many controls' });
    }
    else if (typedError.typed === 'build-error') {
        showNotice({ set, message: getErrorSubMessage(typedError) });
    }
    else if (typedError.extra) {
        showNotice({ set, message: typedError.extra, isError: true });
    } else {
        showNotice({ set, message: 'There are no input controls in the window' });
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
