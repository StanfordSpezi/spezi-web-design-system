//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import {
  CollapsibleContentRoot,
  CollapsibleContentInner,
} from "@/components/Collapsible";
import { cn } from "@/utils/className";

/**
 * An accordion is a vertically stacked set of interactive headings that each reveal a section of content.
 *
 * For unstyled variant just for one trigger, see {@link CollapsibleRoot|Collapsible}.
 *
 * @example
 * ```tsx
 * // Just one item can be opened at once
 * <AccordionRoot type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Accessibility</AccordionTrigger>
 *     <AccordionContent>It adheres to the WAI-ARIA design pattern.</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Styles</AccordionTrigger>
 *     <AccordionContent>It comes with default styling.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple items can be opened simultaneously
 * <AccordionRoot type="multiple">
 *   <AccordionItem value="item-1">...</AccordionItem>
 *   <AccordionItem value="item-2">...</AccordionItem>
 * </Accordion>
 * ```
 */
export const AccordionRoot = (
  props: ComponentProps<typeof AccordionPrimitive.Root>,
) => <AccordionPrimitive.Root data-slot="accordion" {...props} />;

/**
 * A single item within an accordion. Must be a direct child of `Accordion`.
 * Each item needs a unique `value` prop to identify it.
 *
 * @example
 * ```tsx
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Trigger text</AccordionTrigger>
 *   <AccordionContent>Content</AccordionContent>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    data-slot="accordion-item"
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
);

/**
 * The trigger button that toggles the expanded state of an accordion item.
 * Must be a direct child of {@link AccordionItem}.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Section title</AccordionTrigger>
 * ```
 */
export const AccordionTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "interactive-opacity flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground size-4 shrink-0 translate-y-0.5 transition" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

/**
 * The expandable content section of an accordion item.
 * Must be a direct child of {@link AccordionItem}.
 *
 * Features smooth animation through the {@link CollapsiblePrimitive} component.
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   Content that will be revealed when the accordion item is expanded.
 * </AccordionContent>
 * ```
 */
export const AccordionContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    data-slot="accordion-content"
    className="text-sm"
    asChild
    forceMount
    {...props}
  >
    <CollapsibleContentRoot>
      <CollapsibleContentInner>
        <div className={cn("pt-0 pb-4", className)}>{children}</div>
      </CollapsibleContentInner>
    </CollapsibleContentRoot>
  </AccordionPrimitive.Content>
);
