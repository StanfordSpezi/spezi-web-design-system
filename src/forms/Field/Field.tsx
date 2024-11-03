//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactElement, ReactNode } from 'react'
import {
  Controller,
  type ControllerFieldState,
  type ControllerProps,
  type ControllerRenderProps,
  type ErrorOption,
  type FieldPath,
  type FieldValues,
  type UseFormStateReturn,
} from 'react-hook-form'
import { FieldTooltip } from './FieldTooltip'
import { Error } from '../../components/Error'
import { Label } from '../../components/Label'

export type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName> & {
      id: string
      'aria-invalid': boolean
      'aria-errormessage': string
    }
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => ReactElement
  label?: ReactNode
  className?: string
  checkEmptyError?: boolean
  error?: ErrorOption
  /**
   * Adds tooltip on top of field, helpful for explaining details about field
   * */
  tooltip?: ReactNode
}

/**
 * Registers form field with correct error and label handler built-in
 * */
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
  const id = name
  return (
    <Controller
      {...props}
      name={name}
      render={(states) => {
        const errorId = `${id}-error`
        const error = errorProp ?? states.fieldState.error
        const fieldProps = {
          ...states.field,
          id,
          'aria-errormessage': error ? errorId : '',
          'aria-invalid': !!error,
        }
        return (
          <div className={className}>
            {(tooltip ?? label) && (
              <div className="mb-2 flex gap-2">
                {label && <Label htmlFor={id}>{label}</Label>}
                {tooltip && (
                  <FieldTooltip tooltip={tooltip} label={label} id={id} />
                )}
              </div>
            )}
            {render({
              ...states,
              field: fieldProps,
            })}
            <Error id={errorId} checkEmpty={checkEmptyError}>
              {error?.message}
            </Error>
          </div>
        )
      }}
    />
  )
}
