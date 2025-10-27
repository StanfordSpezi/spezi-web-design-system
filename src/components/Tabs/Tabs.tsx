//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Tabs as TabsPrimitive } from "radix-ui";
import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "@/utils/className";

/**
 * A tabs component for organizing content into multiple panels.
 * Built on top of [radix-ui Tabs](https://www.radix-ui.com/primitives/docs/components/tabs).
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">
 *     <p>Account settings</p>
 *   </TabsContent>
 *   <TabsContent value="password">
 *     <p>Password settings</p>
 *   </TabsContent>
 * </Tabs>
 * ```
 *
 *
 * @example
 * ```tsx
 * // Tabs as links
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account" asChild>
 *       <Link href="/account">Account</Link>
 *     </TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">
 *     <p>Account settings</p>
 *   </TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = TabsPrimitive.Root;

interface TabsListContextProps {
  /**
   * When set to true, expands the tabs navigation to occupy the full available width.
   *
   * This is useful for creating a more balanced layout when your tabs container
   * spans the full width of its parent. Tab items will be distributed
   * evenly across the available space.
   *
   * @default false - By default, tabs will only take up as much space as needed.
   */
  grow?: boolean;
}

interface TabsListProps
  extends ComponentProps<typeof TabsPrimitive.List>,
    TabsListContextProps {}

const TabsListContext = createContext<TabsListContextProps>({
  grow: false,
});

/**
 * Container for Tab's triggers.
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="account">Account</TabsTrigger>
 *   <TabsTrigger value="password">Password</TabsTrigger>
 * </TabsList>
 * ```
 */
export const TabsList = ({ className, grow, ...props }: TabsListProps) => (
  <TabsListContext.Provider value={{ grow }}>
    <TabsPrimitive.List
      className={cn(
        "inline-flex-center text-muted-foreground h-10 p-1",
        grow && "w-full",
        className,
      )}
      {...props}
    />
  </TabsListContext.Provider>
);

/**
 * Trigger for a single tab. Should be wrapped with {@link TabsList}`.
 * Can be rendered as a link using asChild.
 */
export const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  const { grow } = useContext(TabsListContext);
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex-center focus-ring border-b-border data-[state=active]:border-b-primary data-[state=active]:text-foreground border-b px-3 py-2 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-xs",
        grow && "grow",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Displays content of currently active tab. Only one tab can be active at once.
 */
export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn("focus-ring mt-2", className)}
    {...props}
  />
);
