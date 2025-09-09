import React from "react";
import type { Preview } from "@storybook/react";
import { UIProvider } from "../src/HOC/UIProvider";
import "../src/index.css";
import { BrowserRouter } from "react-router-dom";

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <UIProvider>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </UIProvider>
      );
    },
  ],
};

export default preview;
