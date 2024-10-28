//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import * as TabsPrimitive from '@radix-ui/react-tabs'
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ElementRef,
  forwardRef,
  useContext,
} from 'react'
import { cn } from '../../utils/className'

export const Tabs = TabsPrimitive.Root

interface TabsListContextProps {
  /**
   * Expand tabs control to occupy available width
   * */
  grow?: boolean
}

interface TabsListProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    TabsListContextProps {}

const TabsListContext = createContext<TabsListContextProps>({
  grow: false,
})

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, grow, ...props }, ref) => (
  <TabsListContext.Provider value={{ grow }}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'inline-flex-center h-10 p-1 text-muted-foreground',
        grow && 'w-full',
        className,
      )}
      {...props}
    />
  </TabsListContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { grow } = useContext(TabsListContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex-center focus-ring whitespace-nowrap border-b border-b-border px-3 py-2 text-sm font-medium transition-all focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        grow && 'grow',
        className,
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('focus-ring mt-2', className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName
