//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { PopoverRoot, PopoverContent, PopoverTrigger } from "./Popover";

const meta: Meta<typeof PopoverRoot> = {
  title: "Components/Popover",
  component: PopoverRoot,
};

export default meta;

export const Default = () => (
  <PopoverRoot>
    <PopoverTrigger>Trigger</PopoverTrigger>
    <PopoverContent>Content</PopoverContent>
  </PopoverRoot>
);

export const Arrow = () => (
  <PopoverRoot>
    <PopoverTrigger>Trigger</PopoverTrigger>
    <PopoverContent arrow>Content</PopoverContent>
  </PopoverRoot>
);
