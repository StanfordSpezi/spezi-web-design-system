//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { zodResolver } from '@hookform/resolvers/zod'
import { isObject, isString } from 'lodash'
import { useCallback } from 'react'
import {
  type DeepRequired,
  type FieldErrorsImpl,
  type ErrorOption,
  useForm as useFormHook,
  type UseFormProps,
} from 'react-hook-form'
import { type z } from 'zod'

type FieldValues = Record<string, unknown>

type ErrorsObject<TFieldValues extends FieldValues> = Partial<
  FieldErrorsImpl<DeepRequired<TFieldValues>>
>

export const FORM_ERROR_KEY = 'FORM_ERROR'

class ValidationError<
  TFieldValues extends FieldValues = FieldValues,
> extends Error {
  fieldErrors: ErrorsObject<TFieldValues>
  constructor(fieldErrors: ErrorsObject<TFieldValues>) {
    super('Form validation field when submitting')
    this.fieldErrors = fieldErrors
  }
}

/**
 * Wrapper over react-hook-form's useForm
 * Provides default types and custom functionalities
 * */
export const useForm = <Schema extends z.ZodTypeAny>({
  formSchema,
  ...props
}: UseFormProps<z.infer<Schema>> & {
  formSchema: Schema
}) => {
  const form = useFormHook<z.infer<Schema>>({
    resolver: zodResolver(formSchema),
    ...props,
  })

  const {
    formState: { isValid, isDirty, errors },
    setError,
  } = form

  /**
   * Function to get form's data, but only if it actually passes validation
   * Useful when needed to combine couple useForms into one
   * Prevents callback hell and wrong execution flow if form is not valid
   * */
  const submitAsync = () =>
    new Promise<z.infer<Schema>>((resolve, reject) => {
      void form.handleSubmit(
        (data) => {
          resolve(data)
        },
        (errorFields) => {
          const error = new ValidationError(errorFields)
          reject(error)
        },
      )()
    })

  /**
   * Utility that helps to handle form errors
   * Respects form state, resets on submit
   * Handles both known string errors and unknown error objects
   * */
  const setFormError = useCallback(
    (error: unknown, options?: Parameters<typeof setError>[2]) => {
      const errorValue = {
        message:
          isObject(error) && 'message' in error && isString(error.message) ?
            error.message
          : isString(error) ? error
          : 'Unknown error happened',
      }
      setError(
        // @ts-expect-error Form error is special key, so error here is fine
        FORM_ERROR_KEY,
        errorValue,
        options,
      )
    },
    [setError],
  )

  const formError = errors[FORM_ERROR_KEY] as ErrorOption | undefined

  const isSubmitDisabled = !isValid || !isDirty

  return {
    ...form,
    submitAsync,
    formError,
    setFormError,
    isSubmitDisabled,
  }
}
