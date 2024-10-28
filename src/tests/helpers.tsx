//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'

interface TestRouterProviderProps {
  children: ReactNode
}

export const TestRouterProvider = ({ children }: TestRouterProviderProps) => {
  const rootRoute = createRootRoute({
    component: Outlet,
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <>{children}</>,
  })

  const routeTree = rootRoute.addChildren([indexRoute])
  const router = createRouter({ routeTree })

  return <RouterProvider router={router} />
}

export const renderWithProviders = (node: ReactNode, options?: RenderOptions) =>
  render(<TestRouterProvider>{node}</TestRouterProvider>, options)
