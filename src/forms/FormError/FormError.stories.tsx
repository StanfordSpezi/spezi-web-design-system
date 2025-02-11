//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { FormError } from "./FormError";

const meta: Meta<typeof FormError> = {
  title: "Forms/FormError",
  component: FormError,
};

export default meta;

type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: { formError: { message: "User already exists" } },
};

export const Prefixed: Story = {
  args: {
    prefix: "Form invitation error. ",
    formError: {
      message: "User already exists",
    },
  },
};
