import { AllHTMLAttributes } from "react";

export function disableHiddenChildren(visible: boolean, parent: HTMLElement | null | undefined) {
    if (!parent) return;

    const inputs = [...(parent.querySelectorAll('input'))];
    if (visible) {
        inputs.forEach((el) => {
            if (el.dataset['disState']) {
                delete el.dataset['disState'];
            } else {
                el.removeAttribute('disabled');
            }
        });
    } else {
        inputs.forEach((el) => {
            if (el.disabled) {
                el.dataset['disState'] = '1';
            } else {
                el.setAttribute('disabled', 'true');
            }
        });
    }
}

export const turnOffAutoComplete: AllHTMLAttributes<HTMLElement> = { autoComplete: "new-password", list: "autocompleteOff", spellCheck: "false", };
