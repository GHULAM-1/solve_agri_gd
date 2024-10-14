export const toTitleCase = (s: string): string =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/-)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/-

export const toCamelCase = (str: string): string => {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
};

export const toKebabCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, "-");
}