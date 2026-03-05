//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { z } from "zod";
import { Button } from "@/components/Button";
import { Label as LabelComponent, LabelContainer } from "@/components/Label";
import { useOpenState } from "@/utils/useOpenState";
import { Input } from "../../components/Input";
import { useForm } from "../useForm";
import { Field } from "./Field";

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
 */
export const Error = () => {
  const form = useForm({ formSchema });
  return (
    <Field
      control={form.control}
      name="name"
      label="Name"
      error={{ message: "Name is required field", type: "validationError" }}
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

interface CheckEmptyErrorProps {
  checkEmptyError?: boolean;
}

const CheckEmptyError = ({ checkEmptyError }: CheckEmptyErrorProps) => {
  const errorVisibility = useOpenState();
  const form = useForm({ formSchema });
  return (
    <div>
      <Field
        control={form.control}
        name="name"
        label="Field with error"
        error={
          errorVisibility.isOpen ?
            { message: "Name is a required field", type: "validationError" }
          : undefined
        }
        checkEmptyError={checkEmptyError}
        render={({ field }) => <Input {...field} />}
      />
      <Button onClick={errorVisibility.toggle}>
        {errorVisibility.isOpen ? "Hide" : "Show"} error
      </Button>
    </div>
  );
};

/**
 * By default, Field reserves minimum space for the error message even when there is no error,
 * which helps reduce layout shifts for typical single-line errors. The text below the fields
 * is less likely to move when errors are shown or hidden.
 */
export const CheckEmptyErrorOff = () => (
  <CheckEmptyError checkEmptyError={false} />
);

/**
 * With `checkEmptyError` enabled, the error element is removed from the DOM when empty.
 * This causes surrounding content to shift when errors appear or disappear.
 */
export const CheckEmptyErrorOn = () => <CheckEmptyError checkEmptyError />;

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
