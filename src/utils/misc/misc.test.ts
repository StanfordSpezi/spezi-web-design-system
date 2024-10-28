//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { not, times, upperFirst } from './misc'

describe('not', () => {
  it('negates value', () => {
    expect(not(true)).toBe(false)
    expect(not(false)).toBe(true)
    expect(not('')).toBe(true)
    expect(not(5)).toBe(false)
  })
})

describe('upperFirst', () => {
  it('makes first letter of string uppercased', () => {
    expect(upperFirst('lorem')).toBe('Lorem')
    expect(upperFirst('LOREM')).toBe('LOREM')
    expect(upperFirst('loReM')).toBe('LoReM')
    expect(upperFirst('lorem ipsum')).toBe('Lorem ipsum')
    expect(upperFirst('lorem IPSUM')).toBe('Lorem IPSUM')
    expect(upperFirst('')).toBe('')
    expect(upperFirst('l')).toBe('L')
  })
})

describe('times', () => {
  it('generates array with provided length', () => {
    expect(times(3, () => null)).toEqual([null, null, null])
    expect(times(2, (index) => index)).toEqual([0, 1])
  })
})
