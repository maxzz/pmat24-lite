import { createContext, useContext, useMemo, useState, type ReactNode, } from "react";
import { initI18n, type LanguageMessages } from "./lib";

const TranslationContext = createContext<
    | (ReturnType<typeof initI18n> & {
        setLocale: (locale: string) => void;
        locale: string;
        userLocale: string;
    })
    | null
>(null);

export function TranslationProvider({
    defaultLocale,
    translations,
    fallbackLocale,
    children,
}: {
    defaultLocale?: string;
    translations: Record<Lowercase<string>, LanguageMessages>;
    fallbackLocale: string | string[];
    children: ReactNode;
}) {
    const [locale, setLocale] = useState(
        () => {
            if (defaultLocale == null) return navigator.language;
            return defaultLocale;
        }
    );
    const initRes = useMemo(() => {
        return initI18n({
            locale,
            fallbackLocale,
            translations,
        });
    }, [locale, fallbackLocale, translations]);

    return (
        <TranslationContext value={{ ...initRes, setLocale, locale, userLocale: navigator.language }}>
            {children}
        </TranslationContext>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context == null) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
}

export function LocaleChooser({ locales }: { locales: string[]; }) {
    const { setLocale, locale: selectedLocale, userLocale } = useTranslation();

    return (
        <select
            onChange={e => {
                setLocale(e.target.value);
            }}
            value={selectedLocale.toLowerCase()}
        >
            {[...new Set([userLocale, ...locales])].map(locale => (
                <option key={locale} value={locale.toLowerCase()}>
                    {locale}
                </option>
            ))}
        </select>
    );
}
