//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
/* eslint-disable @typescript-eslint/no-explicit-any */

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(undefined), ms))

export const logPerformance = <T>(name: string, callback: () => T) => {
  performance.mark(`mark-${name}`)
  const res = callback()
  performance.measure(name, `mark-${name}`)
  console.info(performance.getEntriesByName(name)[0])
  return res
}

export const notImplementedError: any = () => {
  throw new Error('Not implemented')
}

export const notImplementedAlert: any = () => {
  alert('Not implemented')
}
