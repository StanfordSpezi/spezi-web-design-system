//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode, useContext } from "react";
import { useSpeziContext } from "@/SpeziProvider";
import { cn } from "@/utils/className";
import { DashboardContext } from "./DashboardContext";
import { Tooltip } from "../../components/Tooltip";

interface MenuItemProps {
  /**
   * URL to navigate to when clicked.
   */
  href: string;
  /**
   * Whether the item is currently active route.
   */
  isActive?: boolean;
  /**
   * Whether to show a highlight indicator.
   * Use highlight for elements that contain new data, like a notification.
   */
  isHighlighted?: boolean;
  /**
   * Icon to display before the label.
   */
  icon?: ReactNode;
  /**
   * Text label for the menu item.
   */
  label?: string;
  /**
   * Additional slot to display after the label.
   */
  children?: ReactNode;
}

/**
 * A navigation menu item component for the dashboard sidebar.
 * Supports responsive behavior with the dashboard's shrinkable state.
 *
 * Features:
 * - Active state styling
 * - Highlight indicator
 * - Tooltip for collapsed state
 * - Icon support
 *
 * @example
 * ```tsx
 * <MenuItem
 *   href="/dashboard"
 *   icon={<Home />}
 *   label="Dashboard"
 *   isActive
 * />
 * ```
 */
export const MenuItem = ({
  href,
  icon,
  isActive,
  label,
  isHighlighted,
  children,
}: MenuItemProps) => {
  const { shrinkable } = useContext(DashboardContext);
  const {
    router: { Link },
  } = useSpeziContext();

  const content = (
    <>
      <Link
        href={href}
        className={cn(
          "focus-ring relative flex items-center gap-3 rounded-lg p-2 font-medium no-underline transition",
          isActive ?
            "bg-accent/50 text-primary hover:opacity-60"
          : "text-foreground/60 hover:bg-accent hover:text-foreground",
          shrinkable ? "xl:w-full xl:self-start" : "lg:w-full lg:self-start",
        )}
      >
        {icon}
        <span className={cn("grow", shrinkable && "lg:hidden xl:block")}>
          {label}
        </span>
        {children}
        {isHighlighted && (
          <i
            aria-hidden
            className={cn(
              "bg-destructive size-2.5 rounded-full",
              shrinkable &&
                "lg:absolute lg:top-1 lg:right-1 lg:size-1.5 xl:static xl:size-2.5",
            )}
          />
        )}
      </Link>
    </>
  );

  return shrinkable ?
      <Tooltip
        key={href}
        tooltip={label}
        sideOffset={8}
        side="right"
        className="hidden lg:block xl:hidden"
      >
        {content}
      </Tooltip>
    : content;
};
