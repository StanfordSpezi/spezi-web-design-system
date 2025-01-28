//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import { type Preview } from "@storybook/react";
import "../src/main.css";
/**
 * We need to import preflight in Stories,
 * because that's how components are required to be consumed in client-land
 * */
import "./preflight.css";
import { TestProviders } from "../src/tests/helpers";

const preview: Preview = {
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
    (Story) => (
      <TestProviders>
        <Story />
      </TestProviders>
    ),
  ],
};

export default preview;
