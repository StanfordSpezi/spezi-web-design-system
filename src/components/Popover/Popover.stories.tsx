//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import {
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  PopoverCloseX,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "./Popover";

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

export const Close = () => (
  <PopoverRoot>
    <PopoverTrigger>Trigger</PopoverTrigger>
    <PopoverContent>
      Content
      <PopoverCloseX />
    </PopoverContent>
  </PopoverRoot>
);

export const Header = () => (
  <PopoverRoot>
    <PopoverTrigger>Trigger</PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Lorem ipsum</PopoverTitle>
        <PopoverDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          architecto asperiores atque consectetur.
        </PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </PopoverRoot>
);
