import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

let i18n;

export const SUPPORT_LOCALES = ['de', 'en'];

export async function setI18nLanguage(locale) {
    await loadLocaleMessages(locale);

    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }

    document.querySelector('html').setAttribute('lang', locale);
    localStorage.setItem('lang', locale);
}

export async function loadLocaleMessages(locale) {
    const messages = await import(`@/locales/${locale}.json`);

    i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick();
}

export default function setupI18n() {
    if(!i18n) {
        let locale = localStorage.getItem('lang') || 'en';

        i18n = createI18n({
            globalInjection: true,
            legacy: false,
            locale: locale,
            fallbackLocale: 'de'
        });

        setI18nLanguage(locale);
    }
    return i18n;
}