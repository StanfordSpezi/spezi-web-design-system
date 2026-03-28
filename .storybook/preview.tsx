//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import { type Preview } from "@storybook/react";
import { useEffect } from "react";
import "./storybook.css";
import { TestProviders } from "../src/tests/helpers";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme mode",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "system", title: "System", icon: "browser" },
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "system",
  },
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;

      useEffect(() => {
        if (theme === "system") {
          document.documentElement.removeAttribute("data-theme");
        } else {
          document.documentElement.dataset.theme = theme;
        }
      }, [theme]);

      return (
        <TestProviders>
          <Story />
        </TestProviders>
      );
    },
  ],
};

export default preview;
