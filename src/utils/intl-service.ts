// intlService.js
let formatMessageFn = null as any;

/**
 * Call this function during your app's initialization or in a top-level component,
 * passing in the translation function from your locale/context.
 */
export const setFormatMessage = (fn: any) => {
  formatMessageFn = fn;
};

/**
 * Use this function to translate a message by its id.
 * It falls back to the message id if the function is not yet set.
 */
export const translate = ({ id, defaultMessage = id, values = {} }: any) => {
  if (formatMessageFn) {
    return formatMessageFn({ id, defaultMessage }, values);
  }

  return defaultMessage;
};
