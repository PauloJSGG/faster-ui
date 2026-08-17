import { defineConfig } from "tsup";

/*
 * `clsx`, `tailwind-merge` and `class-variance-authority` are left out of the
 * `external` list on purpose - tsup treats everything in `dependencies` as
 * external already. React is listed because peer dependencies need the
 * subpath too, and `react/jsx-runtime` is what the JSX transform emits.
 *
 * The stylesheet is not built here. Tailwind compiles it separately into the
 * same `dist`, after this step, because `clean` empties the directory.
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  tsconfig: "tsconfig.app.json",
  external: ["react", "react-dom", "react/jsx-runtime"],
});
