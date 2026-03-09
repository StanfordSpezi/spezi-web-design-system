//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { display: "label", variant: "outline" },
};

export const WithIconAndLabel: Story = {
  args: { display: "both", variant: "outline" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};
