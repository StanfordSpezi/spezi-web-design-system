//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { InfoButton } from "./InfoButton";
import { Tooltip } from "../Tooltip/Tooltip";

const meta: Meta<typeof InfoButton> = {
  title: "Components/InfoButton",
  component: InfoButton,
};

export default meta;

type Story = StoryObj<typeof InfoButton>;

export const Default: Story = {};

export const WithTooltip: Story = {
  render: () => (
    <Tooltip tooltip="Additional information about this field">
      <InfoButton />
    </Tooltip>
  ),
};
