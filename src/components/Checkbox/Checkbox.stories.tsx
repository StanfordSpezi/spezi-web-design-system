//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useArgs } from "@storybook/core/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { type ComponentProps } from "react";
import { SideLabel } from "@/components/SideLabel";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    checked: false,
    onCheckedChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<ComponentProps<typeof Checkbox>>();
    return (
      <Checkbox
        {...args}
        onCheckedChange={(checked) => updateArgs({ checked })}
      />
    );
  },
};

export const Checked: Story = {
  ...Default,
  args: {
    checked: true,
  },
};

export const Labeled = () => (
  <SideLabel label="Show unread only">
    <Checkbox />
  </SideLabel>
);
