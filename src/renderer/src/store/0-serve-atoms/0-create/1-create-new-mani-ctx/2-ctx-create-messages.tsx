import { type ReactNode } from "react";
import { doAddNextToastIdAtom } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { type TypedError, stateNapiAccess, setBuildState, splitTypedError, typedErrorToString } from "@/store/7-napi-atoms";

export function showNotice({ set, message, isError }: { set: Setter; message: ReactNode; isError?: boolean; }) {
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
        showNotice({ set, message: 'No input controls found in the window.' });
    }

    setBuildState({ error: '' });
}

function getErrorSubMessage(error: TypedError): ReactNode {
    switch (error.sub) {
        case 'incompatiblePM': {
            return `<div>The version of the HID Password Manager extension is incompatible with the version of HID Password Manager. ${linkMessageClasses}</div>`;
        }
        case 'noBrExt': {
            return `<div>The HID Password Manager extension is not installed in this browser. ${linkMessageClasses}</div>`;
        }
        case 'obsoleteBrExt': {
            return `<div>The HID Password Manager extension version is outdated. Please update it. ${linkMessageClasses}</div>`; //Update the HID Password Manager extension.
        }
        case 'noControls':
        default: {
            return "Cannot access application content.";
        }
    }
}

const linkMessageClasses = `<a class="text-blue-400 dark:text-blue-700 underline underline-offset-2" href="https://digitalpersona.hidglobal.com/g02/pagedp/index.html" target="_blank" rel="noopener noreferrer">Installation page.</a>`;
