//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { StatusDot } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
  title: "Components/StatusDot",
  component: StatusDot,
};

export default meta;

type Story = StoryObj<typeof StatusDot>;

export const Default: Story = {
  args: {
    status: "default",
  },
};

export const Primary: Story = {
  args: {
    status: "primary",
  },
};

export const Success: Story = {
  args: {
    status: "success",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
};

export const Destructive: Story = {
  args: {
    status: "destructive",
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
  },
};

export const MediumSize: Story = {
  args: {
    size: "md",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const CustomColor: Story = {
  args: {
    status: null,
    appearance: "glow",
    className: "bg-blue-500 [--glow-color:theme(colors.blue.500)]",
    "aria-label": "In progress",
  },
};

export const WithGlow: Story = {
  args: {
    appearance: "glow",
    size: "lg",
    status: "success",
  },
};
