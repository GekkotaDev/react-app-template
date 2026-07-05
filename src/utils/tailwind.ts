export const tw = (strings: TemplateStringsArray, ...values: string[]) =>
  String.raw({ raw: strings }, ...values)
    .split(" ")
    .filter((slice) => slice !== "")
    .join(" ");
