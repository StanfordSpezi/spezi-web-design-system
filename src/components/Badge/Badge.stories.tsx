//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { StatusDot, type StatusDotProps } from "../StatusDot";
import { Badge, type BadgeProps } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Lorem",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Success: Story = { args: { variant: "success" } };
export const SuccessLight: Story = { args: { variant: "successLight" } };
export const Warning: Story = { args: { variant: "warning" } };
export const WarningLight: Story = { args: { variant: "warningLight" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const DestructiveLight: Story = {
  args: { variant: "destructiveLight" },
};
export const Outline: Story = { args: { variant: "outline" } };

export const Sm: Story = { args: { size: "sm" } };
export const Lg: Story = { args: { size: "lg" } };

type StoryWithStatusDot = StoryObj<
  BadgeProps & {
    statusDotStatus: StatusDotProps["status"];
    statusDotAppearance: StatusDotProps["appearance"];
    statusDotSize: StatusDotProps["size"];
  }
>;

export const WithStatusDot: StoryWithStatusDot = {
  args: {
    variant: "outline",
    children: "Published",
    statusDotStatus: "success",
    statusDotAppearance: "glow",
    statusDotSize: "sm",
  },
  argTypes: {
    statusDotStatus: {
      control: { type: "select" },
      options: ["default", "primary", "success", "warning", "destructive"],
    },
    statusDotAppearance: {
      control: { type: "select" },
      options: ["solid", "glow"],
    },
    statusDotSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  render: ({
    statusDotSize,
    statusDotStatus,
    statusDotAppearance,
    children,
    ...args
  }) => (
    <Badge {...args}>
      <StatusDot
        status={statusDotStatus}
        appearance={statusDotAppearance}
        size={statusDotSize}
      />
      <span>{children}</span>
    </Badge>
  ),
};
