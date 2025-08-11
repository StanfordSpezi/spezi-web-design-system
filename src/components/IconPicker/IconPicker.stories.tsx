//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { IconPicker } from "./IconPicker";

const meta: Meta<typeof IconPicker> = {
  title: "Components/IconPicker",
  component: IconPicker,
};

export default meta;

type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {};
