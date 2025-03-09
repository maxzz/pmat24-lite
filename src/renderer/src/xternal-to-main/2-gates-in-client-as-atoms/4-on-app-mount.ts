import { useEffect } from "react";
import { debugSettings } from "../../store/1-atoms/9-ui-state";
import { R2MCalls } from "./commands-to-main";

// Initial state exchange with main process

export function sendNapiOptions() {
    R2MCalls.setNapiOptions({state: { maxControls: debugSettings.uiState.maxControls }});
}

export function OnAppMount() {
    useEffect(() => {
        sendNapiOptions();
    }, []);
    return null;
}
