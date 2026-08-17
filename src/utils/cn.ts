import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * Registering the prefix is most of the work: it strips `fui:` and resolves the
 * rest against Tailwind's own class groups, so `fui:bg-primary` and
 * `fui:bg-danger` are correctly seen as conflicting.
 *
 * The sizing groups still need help. tailwind-merge validates a class by its
 * value, and where it accepts any word as a colour it wants a number for a
 * height or a padding. `fui:h-button-md` therefore reads as an unknown class and
 * would survive alongside `fui:h-button-lg`, leaving the winner to stylesheet
 * order rather than to the last class - a size variant that silently stops
 * taking effect.
 *
 * Matching on the component name rather than listing every token means new
 * tokens are covered as long as they follow the same shape. None of Tailwind's
 * own values for these groups begin with one of these words, so nothing stock
 * is captured by mistake.
 */
const isComponentToken = (value: string) =>
  /^(button|input|dialog|icon)(-|$)/.test(value);

const twMerge = extendTailwindMerge({
  prefix: "fui",
  extend: {
    classGroups: {
      h: [{ h: [isComponentToken] }],
      w: [{ w: [isComponentToken] }],
      "min-h": [{ "min-h": [isComponentToken] }],
      "min-w": [{ "min-w": [isComponentToken] }],
      size: [{ size: [isComponentToken] }],
      p: [{ p: [isComponentToken] }],
      m: [{ m: [isComponentToken] }],
      gap: [{ gap: [isComponentToken] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
