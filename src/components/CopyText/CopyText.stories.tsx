//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { CopyText } from "./CopyText";
import { Toaster } from "../Toaster";

const meta: Meta<typeof CopyText> = {
  title: "Components/CopyText",
  component: CopyText,
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CopyText>;

export const Default: Story = {
  args: {
    children: "Special text to copy",
  },
};

export const Truncated: Story = {
  args: {
    children: "50e8400-e29b-41d4-a716-446655440000",
    className: "max-w-[100px]",
  },
};

export const DifferentTextValue: Story = {
  args: {
    children: (
      <>
        <b>John</b> Doe
      </>
    ),
    value: "example",
    className: "max-w-[100px]",
  },
};
