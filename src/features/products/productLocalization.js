import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import enProducts from "../../locales/products/en.json";
import faProducts from "../../locales/products/fa.json"; 
import psProducts from "../../locales/products/ps.json";
 import deProducts from "../../locales/products/de.json";
const productTranslations = {
  en: enProducts,
  fa: faProducts,
   ps: psProducts, 
   de: deProducts,
};

function resolveLanguage(language) {
  return language?.split("-")[0] ?? "en";
}

export function getLocalizedProduct(product, language) {
  if (!product) return product;

  const productId = String(product.productId ?? product.id);
  const content = productTranslations[resolveLanguage(language)]?.[productId];

  // Product translations are kept as a mapping layer because the public API only returns English.
  return {
    ...product,
    title: content?.title ?? product.title,
    description: content?.description ?? product.description,
  };
}

export function useLocalizedProduct(product) {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;

  return useMemo(() => getLocalizedProduct(product, language), [language, product]);
}
