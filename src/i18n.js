const LOCALES = ["en", "zh-CN"];

export function resolveLocale() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");

  if (requested && LOCALES.includes(requested)) {
    return requested;
  }

  const browserLocale = navigator.language || "en";
  if (browserLocale.toLowerCase().startsWith("zh")) {
    return "zh-CN";
  }

  return "en";
}

export function setDocumentLanguage(locale) {
  document.documentElement.lang = locale;
}

export { LOCALES };
