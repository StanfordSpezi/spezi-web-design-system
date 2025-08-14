//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { Async } from "./Async";

const meta: Meta<typeof Async> = {
  title: "Components/Async",
  component: Async,
  args: { entityName: "users" },
};

export default meta;

type Story = StoryObj<typeof Async>;

export const Loading: Story = {
  args: { loading: true },
};

export const Error: Story = {
  args: { error: true },
};

export const CustomMessage: Story = {
  args: { error: { show: true, children: "Custom error message!" } },
};

export const Empty: Story = {
  args: { empty: { show: true } },
};

export const NoPadding: Story = {
  args: { empty: true, padding: false },
};
