//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isString } from 'es-toolkit'
import { type ReactNode } from 'react'
import { type ErrorOption } from 'react-hook-form'
import { ErrorState, type ErrorStateProps } from '@/components/ErrorState'
import { StateContainer } from '@/components/StateContainer'
import { cn } from '@/utils/className'
import { isObject } from '@/utils/misc'

export interface FormErrorProps extends Omit<ErrorStateProps, 'prefix'> {
  formError: ErrorOption | ReactNode
  prefix?: ReactNode
}

/**
 * Exposes form error if exists
 *
 * Use it for exposing form-wide errors, like server errors
 * */
export const FormError = ({
  formError,
  className,
  prefix,
  ...props
}: FormErrorProps) =>
  formError ?
    <StateContainer padding={false} className={cn('pb-5', className)}>
      <ErrorState {...props}>
        {prefix}
        {(
          isObject(formError) &&
          'message' in formError &&
          isString(formError.message)
        ) ?
          formError.message
        : (formError as ReactNode)}
      </ErrorState>
    </StateContainer>
  : null
