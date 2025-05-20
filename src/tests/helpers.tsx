//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, type RenderOptions } from "@testing-library/react";
import type { ReactNode } from "react";
import { SpeziProvider, type SpeziContextType } from "@/SpeziProvider";

interface TestProvidersProps {
  children: ReactNode;
}

const speziProviderContext: SpeziContextType = {
  router: {
    Link: (props) => <a {...props} />,
  },
};

/**
 * Renders all required context providers for test environments.
 */
export const TestProviders = ({ children }: TestProvidersProps) => (
  <SpeziProvider {...speziProviderContext}>{children}</SpeziProvider>
);

interface DefaultWrapperProps {
  children?: ReactNode;
}

const DefaultWrapper = ({ children }: DefaultWrapperProps) => <>{children}</>;

/**
 * Utility for tests that ensures component is rendered with every required context.
 */
export const renderWithProviders = (node: ReactNode, options?: RenderOptions) =>
  render(node, {
    wrapper: ({ children }) => {
      const Wrapper = options?.wrapper ?? DefaultWrapper;
      return (
        <TestProviders>
          <Wrapper>{children}</Wrapper>
        </TestProviders>
      );
    },
  });
