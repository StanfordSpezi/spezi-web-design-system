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
  type FieldErrorsImpl,
  type ErrorOption,
  useForm as useFormHook,
  type UseFormProps,
} from "react-hook-form";
import { type z } from "zod";
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
export const useForm = <Schema extends z.ZodTypeAny>({
  formSchema,
  ...props
}: UseFormProps<z.infer<Schema>> & {
  formSchema: Schema;
}) => {
  const form = useFormHook<z.infer<Schema>>({
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
    new Promise<z.infer<Schema>>((resolve, reject) => {
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
