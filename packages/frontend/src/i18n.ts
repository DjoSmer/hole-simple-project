import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { COOKIE_DOMAIN } from '~/constant';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    debug: false, //APP_DEBUG,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      // order and from where user language should be detected
      order: ['cookie', 'navigator'],

      // keys or params to lookup language from
      //lookupQuerystring: 'lng',
      lookupCookie: 'hole-language',

      // cache user language on
      caches: ['cookie'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 60 * 24 * 30,
      cookieDomain: COOKIE_DOMAIN,

      // optional htmlTag with lang attribute, the default is:
      //htmlTag: document.documentElement,

      // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
      cookieOptions: { path: '/', sameSite: 'strict' },
    },
  });

i18n.on('languageChanged', (lng) => document.documentElement.setAttribute('lang', lng));

export { i18n };
