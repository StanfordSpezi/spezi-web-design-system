//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

const meta: Meta<typeof ConfirmDeleteDialog> = {
  title: "Molecules/ConfirmDeleteDialog",
  component: ConfirmDeleteDialog,
};

export default meta;

type Story = StoryObj<typeof ConfirmDeleteDialog>;

export const Default: Story = {
  args: {
    open: true,
    onDelete: action("onDelete"),
    entityName: "user",
    itemName: "example@example.com",
  },
};

export const Plain: Story = {
  args: {
    open: true,
    onDelete: action("onDelete"),
  },
};
