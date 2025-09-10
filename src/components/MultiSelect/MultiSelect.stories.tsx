//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
};

export default meta;

export const Default = () => (
  <MultiSelect>
    <MultiSelectTrigger className="w-full max-w-[400px]">
      <MultiSelectValue placeholder="Select fruit..." />
    </MultiSelectTrigger>
    <MultiSelectContent>
      <MultiSelectGroup>
        <MultiSelectItem value="apple">Apple</MultiSelectItem>
        <MultiSelectItem value="banana">Banana</MultiSelectItem>
        <MultiSelectItem value="cherry">Cherry</MultiSelectItem>
        <MultiSelectItem value="date">Date</MultiSelectItem>
        <MultiSelectItem value="fig">Fig</MultiSelectItem>
        <MultiSelectItem value="grape">Grape</MultiSelectItem>
      </MultiSelectGroup>
    </MultiSelectContent>
  </MultiSelect>
);
export const CustomSearchAndOverflow = () => (
  <MultiSelect>
    <MultiSelectTrigger className="w-full max-w-[360px] min-w-[200px]">
      <MultiSelectValue
        placeholder="Select components..."
        overflowBehavior="cutoff"
      />
    </MultiSelectTrigger>
    <MultiSelectContent
      search={{ placeholder: "Search components...", emptyMessage: "No tags" }}
    >
      <MultiSelectGroup heading="Common">
        <MultiSelectItem value="button">Button</MultiSelectItem>
        <MultiSelectItem value="input">Input</MultiSelectItem>
        <MultiSelectItem value="select">Select</MultiSelectItem>
        <MultiSelectItem value="textarea">Textarea</MultiSelectItem>
        <MultiSelectItem value="card">Card</MultiSelectItem>
        <MultiSelectItem value="modal">Modal</MultiSelectItem>
        <MultiSelectItem value="tooltip">Tooltip</MultiSelectItem>
        <MultiSelectItem value="dropdown">Dropdown</MultiSelectItem>
        <MultiSelectItem value="badge">Badge</MultiSelectItem>
      </MultiSelectGroup>
    </MultiSelectContent>
  </MultiSelect>
);
