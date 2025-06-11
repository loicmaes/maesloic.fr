export interface DialogObject {
  open: Ref<boolean>;
  callback: (values: unknown) => Promise<void>;
}

export const useDialog = (data?: {
  defaultOpen?: boolean;
  callback?: (values: unknown) => Promise<void>;
}): DialogObject => ({
  open: ref<boolean>(data?.defaultOpen ?? false),
  callback: data?.callback ?? (async values => console.log(values)),
});
