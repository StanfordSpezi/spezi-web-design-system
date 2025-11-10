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
import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    options: [
      { label: "Travel", value: "travel" },
      { label: "Music", value: "music" },
      { label: "Cars", value: "cars" },
      { label: "Food", value: "food" },
      { label: "Technology", value: "tech" },
    ],
    onChange: action("onChange"),
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <CheckboxGroup
        {...args}
        onChange={(values) => {
          updateArgs({ value: values });
          action("onChange")(values);
        }}
      />
    );
  },
  args: {
    value: ["food", "cars"],
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: ["travel", "technology"],
  },
};

export const WithCustomLabels: Story = {
  args: {
    options: [
      {
        label: (
          <div className="flex flex-col">
            <span className="font-medium">Travel</span>
            <span className="text-xs text-gray-500">
              Exploring new destinations
            </span>
          </div>
        ),
        value: "travel",
      },
      {
        label: (
          <div className="flex flex-col">
            <span className="font-medium">Technology</span>
            <span className="text-xs text-gray-500">
              Gadgets and innovations
            </span>
          </div>
        ),
        value: "technology",
      },
      {
        label: (
          <div className="flex flex-col">
            <span className="font-medium">Cars</span>
            <span className="text-xs text-gray-500">
              Performance and mechanics
            </span>
          </div>
        ),
        value: "cars",
      },
    ],
    defaultValue: ["cars"],
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

export const WithNumericValues: Story = {
  args: {
    options: [
      { label: "One", value: 1 },
      { label: "Two", value: 2 },
      { label: "Three", value: 3 },
    ],
    defaultValue: [1, 3],
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { label: "Available", value: "available" },
      { label: "Unavailable", value: "unavailable", disabled: true },
      { label: "Available Too", value: "available-too" },
    ],
    defaultValue: ["available"],
  },
};
