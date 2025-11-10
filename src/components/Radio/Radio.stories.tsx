//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { action } from "storybook/actions";
import { Radio, RadioRoot } from "./Radio";

const meta: Meta = {
  title: "Components/Radio",
};

export default meta;

/**
 * Radio just renders standalone radio input. For complete radio, see RadioGroup.
 */
export const Default = () => (
  <RadioRoot onValueChange={action("onValueChange")}>
    <Radio value="standalone" />
  </RadioRoot>
);
