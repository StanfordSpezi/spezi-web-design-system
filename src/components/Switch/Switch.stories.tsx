//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { SideLabel } from "@/components/SideLabel";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  args: {
    onCheckedChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Unchecked: Story = { args: { checked: false } };

export const Checked: Story = { args: { checked: true } };

export const Functional = () => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} />;
};

export const Labeled = () => (
  <SideLabel label="Show unread only">
    <Switch checked />
  </SideLabel>
);
