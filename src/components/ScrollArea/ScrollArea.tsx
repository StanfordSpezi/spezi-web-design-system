//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { type ComponentProps, type Ref } from "react";
import { cn } from "@/utils/className";

export const ScrollArea = ({
  scrollViewRef,
  className,
  children,
  onScroll,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  scrollViewRef?: Ref<HTMLDivElement | null>;
}) => {
  return (
    <ScrollAreaPrimitive.Root
      data-testid="scroll-area"
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={scrollViewRef}
        data-testid="scroll-area-viewport"
        data-slot="scroll-area-viewport"
        className="focus-ring size-full rounded-[inherit] transition focus-visible:ring-2"
        onScroll={onScroll}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

export const ScrollBar = ({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-testid="scroll-area-scrollbar"
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition select-none",
        orientation === "vertical" ?
          "h-full w-2.5 border-l border-l-transparent"
        : "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
};
