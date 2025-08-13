//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { upperFirst } from "@/utils/misc";
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
export const AllStatuses: Story = {
  render: () => {
    const statuses = [
      "default",
      "primary",
      "success",
      "warning",
      "destructive",
    ] as const;
    return (
      <div className="flex items-center gap-4">
        {statuses.map((status) => (
          <div key={status} className="flex flex-col items-center gap-2">
            <StatusDot status={status} />
            <span className="text-muted-foreground text-xs">
              {upperFirst(status)}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const sizes = [
      { size: "sm", label: "Small" },
      { size: "md", label: "Medium" },
      { size: "lg", label: "Large" },
    ] as const;
    return (
      <div className="flex items-center gap-4">
        {sizes.map(({ size, label }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <StatusDot size={size} />
            <span className="text-muted-foreground text-xs">{label}</span>
          </div>
        ))}
      </div>
    );
  },
};
