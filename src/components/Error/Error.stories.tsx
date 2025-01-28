//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { Error } from "./Error";

const meta: Meta<typeof Error> = {
  title: "Components/Error",
  component: Error,
};

export default meta;

type Story = StoryObj<typeof Error>;

export const Default: Story = { args: { children: "E-mail is required!" } };
export const NoError: Story = { args: { children: null } };
export const NoErrorHidden: Story = {
  args: { children: null, checkEmpty: true },
};
