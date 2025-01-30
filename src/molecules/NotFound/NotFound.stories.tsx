//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { NotFound } from "./NotFound";

const meta: Meta<typeof NotFound> = {
  title: "Molecules/NotFound",
  component: NotFound,
};

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Generic: Story = {
  args: { backPage: { href: "/", name: "home" }, entityName: "page" },
};

export const UserNotFound: Story = {
  args: {
    backPage: { href: "/users", name: "users list" },
    entityName: "user",
  },
};
