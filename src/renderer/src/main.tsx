import "./utils/x-devtool-install-msg-block";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/0-all-app";
import "./assets/css/index.css";

import esES from "./y-i18n/translations/es-ES";
import enUS from "./y-i18n/translations/en-US";
import en from "./y-i18n/translations/en";
import { TranslationProvider } from "./y-i18n/demo-react";
import type translations from "./y-i18n/translations/en";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {/* <App /> */}

        <TranslationProvider
            fallbackLocale={["en"]}
            translations={{ en, "es-es": esES, "en-us": enUS, }}
        >
            <App />
        </TranslationProvider>

    </React.StrictMode>
);

declare module "./y-i18n/lib/my-translations" {
    interface Register {
        translations: typeof translations;
    }
}
