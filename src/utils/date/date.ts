//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isNil } from 'es-toolkit'
import { type Nil } from '@/utils/misc'

type DateInput = Date | string | number

export const formatDate = (value: DateInput) => {
  const date = new Date(value)
  return date.toLocaleDateString()
}

export const formatNilDate = (value: Nil<DateInput>) =>
  value === '' || isNil(value) ? null : formatDate(value)

export const formatDateTime = (value: DateInput) => {
  const date = new Date(value)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
}

export const formatNilDateTime = (value: Nil<DateInput>) =>
  value === '' || isNil(value) ? null : formatDateTime(value)
