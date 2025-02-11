//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { RowDropdownMenu } from "./RowDropdownMenu";
import { DropdownMenuItem } from "../../DropdownMenu";

const meta: Meta<typeof RowDropdownMenu> = {
  title: "Components/DataTable/RowDropdownMenu",
  component: RowDropdownMenu,
};

export default meta;

type Story = StoryObj<typeof RowDropdownMenu>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </>
    ),
  },
};
