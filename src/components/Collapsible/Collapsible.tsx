//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Slot, Collapsible as CollapsiblePrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/utils/className";
import { type AsChildProp } from "@/utils/misc";

/**
 * Primitive component for collapsible content. Root provides state.
 *
 * Renders fully accessible and animated collapsible, with no styles besides necessary.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CollapsibleRoot>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content to collapse</CollapsibleContent>
 * </CollapsibleRoot>
 * ```
 *
 * @example
 * ```tsx
 * // With button and content styles
 * <CollapsibleRoot>
 *   <CollapsibleTrigger asChild>
 *     <Button>Trigger me</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <div className="p-5 bg-primary">Content to collapse</div>
 *   </CollapsibleContent>
 * </CollapsibleRoot>
 * ```
 */
export const CollapsibleRoot = (
  props: ComponentProps<typeof CollapsiblePrimitive.Root>,
) => <CollapsiblePrimitive.Root data-slot="collapsible-root" {...props} />;

/**
 * Button that toggles the collapsible.
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger asChild>
 *   <Button>Trigger me</Button>
 * </CollapsibleTrigger>
 * ```
 */
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export interface CollapsibleRootProps extends ComponentProps<"div"> {
  asChild?: AsChildProp;
}

/**
 * Primitive component providing collapsing animation.
 * Mostly unstyled, provided just essential styles for collapsing.
 *
 * Collapse relies on animating `grid-template-rows`.
 * `1fr` when visible, `0fr` when hidden.
 * This approach guarantees performant transition and animation from 0 to max height.
 *
 * @example
 * ```tsx
 * <CollapsibleContentRoot>
 *   <CollapsibleContentInner>
 *     Content to collapse
 *   </CollapsibleContentInner>
 * </CollapsibleContentRoot>
 * ```
 */
export const CollapsibleContentRoot = ({
  className,
  asChild = false,
  ...props
}: CollapsibleRootProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      className={cn(
        "grid !transition-all data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]",
        className,
      )}
      {...props}
    />
  );
};

export interface CollapsibleContentProps extends ComponentProps<"div"> {
  asChild?: AsChildProp;
}

/**
 * Content container for CollapsibleContentRoot.
 * It just renders div with hidden overflow, but this structure
 * is necessary for collapsing to work.
 *
 * @remarks
 * If you want to add padding or margin to the content,
 * make sure to add it to the children of `CollapsibleContentInner`.
 *
 * @example
 * ```tsx
 * <CollapsibleContentRoot>
 *   <CollapsibleContentInner>
 *     <div className="p-5">Content to collapse</div>
 *   </CollapsibleContentInner>
 * </CollapsibleContentRoot>
 * ```
 */
export const CollapsibleContentInner = ({
  className,
  asChild = false,
  ...props
}: CollapsibleContentProps) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cn("overflow-hidden", className)} {...props} />;
};

/**
 * Shows collapsed content. Has to be used within CollapsibleRoot.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CollapsibleContent>Content to collapse</CollapsibleContent>
 * ```
 *
 * @example
 * ```tsx
 * // With content styles
 * <CollapsibleContent>
 *   <div className="p-5 bg-primary">Content to collapse</div>
 * </CollapsibleContent>
 * ```
 */
export const CollapsibleContent = ({
  children,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Content>) => (
  <CollapsiblePrimitive.Content asChild forceMount {...props}>
    <CollapsibleContentRoot>
      <CollapsibleContentInner>{children}</CollapsibleContentInner>
    </CollapsibleContentRoot>
  </CollapsiblePrimitive.Content>
);
