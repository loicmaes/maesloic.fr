export default defineNuxtRouteMiddleware(async (to) => {
  const { locale, defaultLocale } = useNuxtApp().$i18n;

  if (!to.path.includes("/admin")) return;

  const key = to.params?.key;
  if (!key) return;

  const store = useAdminStore();
  const { key: storedKey, verified } = storeToRefs(store);

  console.log("verification state", storedKey?.value === key as string && verified.value, key, storedKey.value);

  if (storedKey.value === key as string && verified.value) return;
  if (await store.verifyKey(key as string)) return;
  return navigateTo(`${locale.value === defaultLocale ? "" : `/${locale.value}`}/admin`);
});
