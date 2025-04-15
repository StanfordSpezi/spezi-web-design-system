//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { z } from "zod";
import { LabelContainer, Label as LabelComponent } from "@/components/Label";
import { Field } from "./Field";
import { Input } from "../../components/Input";
import { useForm } from "../useForm";

const meta: Meta<typeof Field> = {
  title: "Forms/Field",
  component: Field,
};

export default meta;

const formSchema = z.object({
  name: z.string().min(1),
});

export const RegisteredField = () => {
  const form = useForm({ formSchema });
  return (
    <Field
      control={form.control}
      name="name"
      render={({ field }) => <Input {...field} />}
    />
  );
};

export const Label = () => {
  const form = useForm({ formSchema });
  return (
    <Field
      control={form.control}
      name="name"
      label="Name"
      render={({ field }) => <Input {...field} />}
    />
  );
};

/**
 * Field errors are coming from formSchema validation
 * This is just example
 * */
export const Error = () => {
  const form = useForm({
    formSchema,
    errors: {
      name: { message: "Name is required field", type: "validationError" },
    },
  });
  return (
    <Field
      control={form.control}
      name="name"
      render={({ field }) => <Input {...field} />}
    />
  );
};

export const Tooltip = () => {
  const form = useForm({ formSchema });
  return (
    <Field
      control={form.control}
      name="name"
      label="Name"
      tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      render={({ field }) => <Input {...field} />}
    />
  );
};

export const CustomLabelElements = () => {
  const form = useForm({ formSchema });
  return (
    <Field
      control={form.control}
      name="name"
      render={({ field }) => (
        <>
          <LabelContainer className="items-center justify-between">
            <LabelComponent htmlFor="name">Name</LabelComponent>
            <a href="/" className="text-xs underline">
              Custom link
            </a>
          </LabelContainer>
          <Input {...field} />
        </>
      )}
    />
  );
};
