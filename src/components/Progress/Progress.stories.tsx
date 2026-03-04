//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  decorators: [
    (Story) => (
      <div className="w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Destructive: Story = {
  args: {
    value: 50,
    color: "destructive",
  },
};

export const DestructiveFull: Story = {
  args: {
    value: 100,
    color: "destructive",
  },
};

export const Primary: Story = {
  args: {
    value: 50,
    color: "primary",
  },
};

export const PrimaryFull: Story = {
  args: {
    value: 100,
    color: "primary",
  },
};
