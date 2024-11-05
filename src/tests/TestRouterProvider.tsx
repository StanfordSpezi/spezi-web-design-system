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
import { type ReactNode, useMemo } from 'react'

interface TestRouterProviderProps {
  children: ReactNode
}

export const TestRouterProvider = ({ children }: TestRouterProviderProps) => {
  const router = useMemo(() => {
    const rootRoute = createRootRoute({
      component: Outlet,
    })

    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '*',
      component: () => <>{children}</>,
    })

    const routeTree = rootRoute.addChildren([indexRoute])
    return createRouter({ routeTree })
  }, [children])

  return <RouterProvider router={router} />
}
