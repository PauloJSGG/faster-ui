import { cn } from "./cn";

/*
 * `cn` only knows how to merge these classes because it is told the `fui`
 * prefix. Without that, `fui:bg-primary` reads as an unrecognised class and
 * survives next to `fui:bg-danger`, leaving the winner to stylesheet order
 * instead of to the last class - a component whose variant silently stops
 * taking effect.
 */
describe("cn", () => {
  describe("the last of two library classes in a group wins", () => {
    const cases: [string, string][] = [
      ["fui:bg-primary", "fui:bg-danger"],
      ["fui:text-neutral", "fui:text-danger"],
      ["fui:border-border", "fui:border-danger"],
      ["fui:h-button-sm", "fui:h-button-lg"],
      ["fui:w-dialog-sm", "fui:w-dialog-lg"],
      ["fui:min-w-button-sm", "fui:min-w-button-lg"],
      ["fui:min-h-button-sm", "fui:min-h-button-lg"],
      ["fui:text-sm", "fui:text-lg"],
      ["fui:rounded-md", "fui:rounded-full"],
      ["fui:p-button-sm", "fui:p-button-lg"],
      ["fui:m-input", "fui:m-0"],
      ["fui:size-icon-button-sm", "fui:size-icon-button-lg"],
      ["fui:gap-button", "fui:gap-dialog-footer"],
      ["fui:font-sans", "fui:font-mono"],
      ["fui:border-0", "fui:border"],
      ["fui:bg-transparent", "fui:bg-primary"],
      ["fui:pointer-events-none", "fui:pointer-events-auto"],
      ["fui:h-full", "fui:h-button-md"],
      ["fui:p-0", "fui:p-input-md"],
      ["fui:gap-input-sm", "fui:gap-dialog-footer"],
      ["fui:size-icon-sm", "fui:size-icon-button-lg"],
      ["fui:h-dialog-divider", "fui:h-input-lg"],
    ];

    it.each(cases)("%s is replaced by %s", (first, second) => {
      expect(cn(first, second)).toBe(second);
    });
  });

  describe("classes from different groups are both kept", () => {
    const cases: [string, string][] = [
      ["fui:text-sm", "fui:text-neutral"],
      ["fui:h-button-md", "fui:w-dialog-md"],
      ["fui:p-button-md", "fui:gap-button"],
      ["fui:bg-primary", "fui:rounded-md"],
      ["fui:box-border", "fui:appearance-none"],
    ];

    it.each(cases)("keeps both %s and %s", (a, b) => {
      const result = cn(a, b);
      expect(result).toContain(a);
      expect(result).toContain(b);
    });
  });

  /*
   * A consumer writes unprefixed classes, because their own Tailwind build has
   * no prefix. Those are a different class name to ours, so tailwind-merge
   * cannot resolve the pair and must keep both - which is correct. Which one
   * paints is then decided by stylesheet order, and dist/index.css is imported
   * at the application's root entry, ahead of their own output.
   */
  it("keeps a consumer's unprefixed class alongside ours", () => {
    const result = cn("fui:bg-primary", "bg-indigo-500");
    expect(result).toContain("fui:bg-primary");
    expect(result).toContain("bg-indigo-500");
  });

  /*
   * The corollary of registering the prefix: unprefixed classes are outside the
   * configuration entirely, so they are passed through untouched rather than
   * merged against each other. Nothing in this library emits them.
   */
  it("passes unprefixed classes through without merging", () => {
    expect(cn("px-2", "px-4")).toBe("px-2 px-4");
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("merges variants and arbitrary properties", () => {
    expect(cn("fui:hover:bg-primary", "fui:hover:bg-danger")).toBe(
      "fui:hover:bg-danger",
    );
    expect(cn("fui:[font:inherit]", "fui:text-md")).toBe(
      "fui:[font:inherit] fui:text-md",
    );
  });

  it("supports conditional class values", () => {
    const isHidden = false;
    expect(cn("fui:flex", isHidden && "fui:hidden", undefined, "fui:gap-2")).toBe(
      "fui:flex fui:gap-2",
    );
  });
});
