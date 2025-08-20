//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import {
  type DeepRequired,
  type ErrorOption,
  type FieldErrorsImpl,
  useForm as useFormHook,
  type UseFormProps,
} from "react-hook-form";
import type * as z3 from "zod/v3";
import type * as z4 from "zod/v4";
import { parseUnknownError } from "@/utils/query";

type FieldValues = Record<string, unknown>;

type ErrorsObject<TFieldValues extends FieldValues> = Partial<
  FieldErrorsImpl<DeepRequired<TFieldValues>>
>;

/**
 * Special key used for form-level errors.
 */
export const FORM_ERROR_KEY = "FORM_ERROR";

/**
 * Custom error class for form validation errors.
 * Extends Error to include field-specific error information.
 */
class ValidationError<
  TFieldValues extends FieldValues = FieldValues,
> extends Error {
  fieldErrors: ErrorsObject<TFieldValues>;
  constructor(fieldErrors: ErrorsObject<TFieldValues>) {
    super("Form validation field when submitting");
    this.fieldErrors = fieldErrors;
  }
}

// Inspired by https://github.com/vercel/ai/blob/c4eff2967ae1cbcb1cc8fd251447c664ea9b868c/packages/provider-utils/src/schema.ts#L31
type FlexibleSchema =
  | z3.ZodType<FieldValues>
  | z4.core.$ZodType<FieldValues, FieldValues>;

type InferSchema<Schema> =
  Schema extends z3.ZodType<FieldValues> ? z3.infer<Schema>
  : Schema extends z4.core.$ZodType<FieldValues, FieldValues> ? z4.infer<Schema>
  : never;

/**
 * Enhanced version of [react-hook-form's useForm](https://react-hook-form.com/docs/useform).
 * Provides Zod schema validation and additional utilities for form handling.
 *
 * Features:
 * - Zod schema validation
 * - Form-level error handling
 * - Async submission handling
 * - Submit button state management
 *
 * @example
 * const form = useForm({
 *   formSchema: z.object({
 *     email: z.string().email(),
 *     password: z.string().min(8)
 *   })
 * });
 */
export const useForm = <Schema = FlexibleSchema, Result = InferSchema<Schema>>({
  formSchema,
  ...props
}: UseFormProps<Result extends FieldValues ? Result : never> & {
  formSchema: Schema;
}) => {
  const form = useFormHook<Result extends FieldValues ? Result : never>({
    // @ts-expect-error -- We know that both zod v3 and zod v4 schemas are supported with @hookform/resolvers ^5.2.1: https://github.com/react-hook-form/resolvers/pull/777
    resolver: zodResolver(formSchema),
    ...props,
  });

  const {
    formState: { isValid, isDirty, errors },
    setError,
  } = form;

  /**
   * Function to get form's data, but only if it actually passes validation.
   * Useful when needed to combine multiple useForms into one.
   * Prevents callback hell and wrong execution flow if one of forms is not valid.
   */
  const submitAsync = () =>
    new Promise<Result>((resolve, reject) => {
      void form.handleSubmit(
        (data) => {
          resolve(data);
        },
        (errorFields) => {
          const error = new ValidationError(errorFields);
          reject(error);
        },
      )();
    });

  /**
   * Utility that helps to handle form errors.
   * Respects form state, resets on submitting.
   * Handles both known string errors and unknown error objects.
   */
  const setFormError = useCallback(
    (error: unknown, options?: Parameters<typeof setError>[2]) => {
      const errorValue = {
        message: parseUnknownError(error),
      };
      setError(
        // @ts-expect-error Form error is a special key, so type error here is expected
        FORM_ERROR_KEY,
        errorValue,
        options,
      );
    },
    [setError],
  );

  /**
   * Wraps react-hook-form's handleSubmit to automatically set form errors for caught exceptions.
   * This adds error handling without requiring try/catch blocks in form handlers.
   */
  const handleSubmit: (typeof form)["handleSubmit"] = (
    successHandler,
    negativeHandler,
  ) =>
    form.handleSubmit(async (...args) => {
      try {
        await successHandler(...args);
      } catch (error) {
        setFormError(error);
      }
    }, negativeHandler);

  const formError = errors[FORM_ERROR_KEY] as ErrorOption | undefined;

  const isSubmitDisabled = !isValid || !isDirty;

  return {
    ...form,
    submitAsync,
    formError,
    setFormError,
    isSubmitDisabled,
    handleSubmit,
  };
};
