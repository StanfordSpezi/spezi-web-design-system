//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { StatusDot } from "../StatusDot";
import { Badge } from "./Badge";

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

export const WithStatusDot: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge variant="outline">
        <StatusDot status="success" />
        <span>Published</span>
      </Badge>
      <Badge variant="outline">
        <StatusDot status="default" />
        <span>Draft</span>
      </Badge>
      <Badge variant="outline">
        <StatusDot status="warning" />
        <span>Pending</span>
      </Badge>
      <Badge variant="outline">
        <StatusDot status="destructive" />
        <span>Error</span>
      </Badge>
    </div>
  ),
};
