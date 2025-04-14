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

export const Tabs = TabsPrimitive.Root;

interface TabsListContextProps {
  /**
   * Expand tabs control to occupy available width
   * */
  grow?: boolean;
}

interface TabsListProps
  extends ComponentProps<typeof TabsPrimitive.List>,
    TabsListContextProps {}

const TabsListContext = createContext<TabsListContextProps>({
  grow: false,
});

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

export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn("focus-ring mt-2", className)}
    {...props}
  />
);
