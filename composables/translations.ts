import { z, type ZodRawShape } from "zod";

export const useTranslations = () => {
  const { t, availableLocales } = useNuxtApp().$i18n;
  const shape: ZodRawShape = {};

  availableLocales.forEach((locale) => {
    shape[locale] = z.string().optional();
  });

  return z.object(shape).superRefine((val, ctx) => {
    const missing: string[] = [];

    availableLocales.filter(lang => !val[lang]?.length).forEach(lang => missing.push(lang));
    if (missing.length)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("form.missing-locales", missing.length, {
          named: {
            languages: missing.map(lang => t(`labels.languages.${lang}`).toLowerCase()).join(", "),
          },
        }),
      });
  });
};
