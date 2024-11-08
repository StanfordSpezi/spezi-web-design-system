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
  RouterContextProvider,
} from '@tanstack/react-router'
import { type ReactNode } from 'react'

interface TestRouterProviderProps {
  children: ReactNode
}

const rootRoute = createRootRoute({
  component: Outlet,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({ routeTree })

export const TestRouterProvider = ({ children }: TestRouterProviderProps) => (
  <RouterContextProvider router={router}>{children}</RouterContextProvider>
)
