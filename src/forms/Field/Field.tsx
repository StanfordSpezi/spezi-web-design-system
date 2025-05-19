//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactElement, ReactNode } from "react";
import {
  Controller,
  type ControllerFieldState,
  type ControllerProps,
  type ControllerRenderProps,
  type ErrorOption,
  type FieldPath,
  type FieldValues,
  type UseFormStateReturn,
} from "react-hook-form";
import { Error } from "@/components/Error";
import { Label, LabelContainer } from "@/components/Label";
import { FieldTooltip } from "./FieldTooltip";

export type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  /**
   * Render function that receives field state and props and renders form input element.
   */
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName> & {
      id: string;
      "aria-invalid": boolean;
      "aria-errormessage": string;
    };
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => ReactElement;
  /**
   * Label text for the field
   */
  label?: ReactNode;
  className?: string;
  /**
   * Whether to check for empty errors.
   * For more details, refer to the `checkEmpty` property of the [Error](src/components/Error/Error.tsx) component.
   */
  checkEmptyError?: boolean;
  /**
   * Custom error message
   */
  error?: ErrorOption;
  /**
   * Tooltip content on top of the field, helpful for explaining details.
   */
  tooltip?: ReactNode;
};

/**
 * A form field component that integrates with [React Hook Form](https://react-hook-form.com/).
 * Provides consistent field rendering with label, error handling, and accessibility features.
 *
 * Features:
 * - Automatic error handling
 * - Label integration
 * - Tooltip support
 * - Accessibility attributes
 * - Empty state checking
 *
 * @example
 * const form = useForm({ formSchema });
 * <Field
 *   control={form.control}
 *   name="email"
 *   label="Email"
 *   render={({ field }) => (
 *     <Input {...field} type="email" />
 *   )}
 * />
 */
export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
  className,
  checkEmptyError,
  render,
  error: errorProp,
  tooltip,
  ...props
}: FieldProps<TFieldValues, TName>) => {
  const id = name;
  return (
    <Controller
      {...props}
      name={name}
      render={(states) => {
        const errorId = `${id}-error`;
        const error = errorProp ?? states.fieldState.error;
        const fieldProps = {
          ...states.field,
          id,
          "aria-errormessage": error ? errorId : "",
          "aria-invalid": !!error,
        };
        return (
          <div className={className}>
            {tooltip || label ?
              <LabelContainer>
                {label && <Label htmlFor={id}>{label}</Label>}
                {tooltip && (
                  <FieldTooltip tooltip={tooltip} label={label} id={id} />
                )}
              </LabelContainer>
            : null}
            {render({
              ...states,
              field: fieldProps,
            })}
            <Error id={errorId} checkEmpty={checkEmptyError}>
              {error?.message}
            </Error>
          </div>
        );
      }}
    />
  );
};
