//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { SpeziProvider } from '@/SpeziProvider'
import { TestRouterProvider } from '@/tests/TestRouterProvider'

interface TestProvidersProps {
  children: ReactNode
}

export const TestProviders = ({ children }: TestProvidersProps) => (
  <TestRouterProvider>
    <SpeziProvider>{children}</SpeziProvider>
  </TestRouterProvider>
)

export const renderWithProviders = (node: ReactNode, options?: RenderOptions) =>
  render(<TestProviders>{node}</TestProviders>, options)
