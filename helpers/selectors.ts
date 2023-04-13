/*
  Selector helper methods
*/
export const byText = (text: string) => `//*[contains(text(),"${text}")]`;
export const byTagAndText = (tag: string, text: string) => `//${tag}[contains(text(),"${text}")]`;
export const byTagAndTextDirectParent = (tag: string, text: string) => `//${tag}[contains(text(),"${text}")]/..`;
export const byPlaceholder = (text: string) => `[placeholder="${text}"]`;
export const buttonByText = (text: string) => `//button[contains(text(),"${text}")]`;
export const linkByText = (text: string) => `//a[contains(text(),"${text}")]`;
export const containsClass = (text: string) => `//*[contains(@class, "${text}")]`;
export const inputByAttributeValue = (attribute: string, text: string) => `input[${attribute}="${text}"]`;