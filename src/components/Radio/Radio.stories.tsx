//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { action } from "@storybook/addon-actions";
import { type Meta } from "@storybook/react";
import { SideLabel } from "@/components/SideLabel";
import { Radio, RadioRoot } from "./Radio";

const meta: Meta = {
  title: "Components/Radio",
};

export default meta;

export const Default = () => (
  <RadioRoot onValueChange={action("onValueChange")}>
    <Radio value="standalone" />
  </RadioRoot>
);

export const Labeled = () => (
  <RadioRoot onValueChange={action("onValueChange")}>
    <SideLabel label="One">
      <Radio value="one" />
    </SideLabel>
    <SideLabel label="Two">
      <Radio value="two" />
    </SideLabel>
  </RadioRoot>
);
