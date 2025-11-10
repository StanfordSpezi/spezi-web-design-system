//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  args: {
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    onChange: action("onChange"),
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Controlled: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <RadioGroup
        {...args}
        onChange={(value) => {
          updateArgs({ value });
          action("onChange")(value);
        }}
      />
    );
  },
  args: {
    value: "option1",
  },
};

export const Uncontrolled: Story = {
  args: { defaultValue: "md" },
};

export const CustomLabels: Story = {
  args: {
    options: [
      {
        label: (
          <div className="flex flex-col">
            <span className="font-medium">Basic Plan</span>
            <span className="text-xs text-gray-500">$10/month</span>
          </div>
        ),
        value: "basic",
      },
      {
        label: (
          <div className="flex flex-col">
            <span className="font-medium">Premium Plan</span>
            <span className="text-xs text-gray-500">$20/month</span>
          </div>
        ),
        value: "premium",
      },
      {
        label: (
          <div className="flex flex-col">
            <span className="font-medium">Enterprise Plan</span>
            <span className="text-xs text-gray-500">$50/month</span>
          </div>
        ),
        value: "enterprise",
      },
    ],
    defaultValue: "premium",
  },
};

export const Horizontal: Story = {
  args: {
    direction: "row",
  },
};

export const HorizontalWrapped: Story = {
  args: {
    direction: "row",
    className: "max-w-40",
  },
};
