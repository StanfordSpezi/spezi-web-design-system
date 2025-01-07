//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { SpeziProvider, type SpeziContextType } from '@/SpeziProvider'

interface TestProvidersProps {
  children: ReactNode
}

const speziProviderContext: SpeziContextType = {
  router: {
    Link: (props) => <a {...props} />,
  },
}

export const TestProviders = ({ children }: TestProvidersProps) => (
  <SpeziProvider {...speziProviderContext}>{children}</SpeziProvider>
)

const DefaultWrapper = ({ children }: { children?: ReactNode }) => (
  <>{children}</>
)

export const renderWithProviders = (node: ReactNode, options?: RenderOptions) =>
  render(node, {
    wrapper: ({ children }) => {
      const Wrapper = options?.wrapper ?? DefaultWrapper
      return (
        <TestProviders>
          <Wrapper>{children}</Wrapper>
        </TestProviders>
      )
    },
  })
