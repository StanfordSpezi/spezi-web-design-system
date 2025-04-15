//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { Select as SelectPrimitive } from "radix-ui";
import { Button } from "../Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".";

const meta: Meta = {
  title: "Components/Select",
};

export default meta;

export const Default = () => (
  <Select>
    <SelectTrigger className="w-[220px]!">
      <SelectValue placeholder="Organizations" />
    </SelectTrigger>
    <SelectContent>
      {["Lorem", "Ipsum", "Sir", "Dolor", "Amet"].map((organization) => (
        <SelectItem value={organization} key={organization}>
          {organization}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const Customized = () => (
  <Select>
    <SelectPrimitive.SelectTrigger asChild>
      <Button>Button as trigger</Button>
    </SelectPrimitive.SelectTrigger>
    <SelectContent>
      {[
        {
          name: "Lorem",
          description: "Lorem ipsum dolor sit amet.",
        },
        {
          name: "Ipsum",
          description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        },
        {
          name: "Sir",
          description: "Labore et dolore magna aliqua.",
        },
        {
          name: "Dolor",
          description: "Ut enim ad minim veniam, quis nostrud exercitation.",
        },
        {
          name: "Amet",
          description: "Duis aute irure dolor in reprehenderit in voluptate.",
        },
      ].map(({ name, description }) => (
        <SelectItem value={name} key={name} itemText={name}>
          <div className="flex flex-col">
            <b>{name}</b>
            <p>{description}</p>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
