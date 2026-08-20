import type { Preview } from "@storybook/react-vite";

/*
 * The exact stylesheet the package publishes - no preflight, prefixed
 * utilities, unlayered. Storybook renders under the same cascade the components
 * face in a consuming application, so anything the reset stand-in is missing
 * shows up here rather than only in someone else's app.
 */
import "../src/styles/index.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        white: { name: "white", value: "#ffffff" },
        dark: { name: "dark", value: "#1a1a1a" },
        black: { name: "black", value: "#000000" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "white" },
  },
};

export default preview;
