//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { UrlObject } from 'url'
import { isString } from 'lodash'
import { toast } from '../../components/Toaster'

/**
 * Negates value
 * Useful for functional patterns and state callbacks
 * */
export const not = (value: unknown) => !value

export type InitialState<T> = T | (() => T)

export type Nil<T> = T | null | undefined

export type Url = string | UrlObject

/**
 * Make some fields in the object partial
 *
 * @example
 * PartialSome<{ a: string, b: string, c: string }, 'a'> => { a?: string, b: string, c: string }
 * */
export type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Handles copying to clipboard and show confirmation toast
 * */
export const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
    toast('Copied to clipboard')
  } catch {
    console.info('Copying failed')
  }
}

/**
 * Makes first letter uppercased
 * @example upperFirst("lorem ipsum") => "Lorem ipsum"
 * */
export const upperFirst = (value: string) =>
  `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`

/**
 * Generates array with specified length
 * */
export const times = <T>(length: number, callback: (index: number) => T) =>
  new Array(length).fill(undefined).map((_, index) => callback(index))

/**
 * Utility to dynamically resolve strategy pattern
 */
export const strategy = <T extends string | number | symbol, F>(
  record: Record<T, F>,
  enumValue: T,
) => record[enumValue]

export const ensureString = (value: unknown) =>
  isString(value) ? value : undefined
