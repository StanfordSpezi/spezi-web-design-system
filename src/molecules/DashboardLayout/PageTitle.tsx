//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";

interface PageTitleProps {
  /**
   * Main title text.
   */
  title?: ReactNode;
  /**
   * Optional subtitle text.
   */
  subTitle?: ReactNode;
  /**
   * Optional icon to display before the title
   */
  icon?: ReactNode;
}

/**
 * A component for displaying page titles with optional icon and subtitle.
 * Used in the {@link DashboardLayoutProps#title|DashboardLayout's title} slot to provide consistent title styling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PageTitle
 *   title="Dashboard"
 *   icon={<Home />}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Helps to identify a resource
 * <PageTitle
 *   title="Edit user"
 *   subTitle="example@example.com"
 *   icon={<User />}
 * />
 * ```
 */
export const PageTitle = ({ title, subTitle, icon }: PageTitleProps) => (
  <div className="flex items-center gap-2 lg:gap-4">
    {icon && (
      <div
        className="flex-center bg-muted rounded-lg p-2 [&_svg]:size-5 lg:[&_svg]:size-6"
        aria-hidden
      >
        {icon}
      </div>
    )}
    <div className="flex flex-col">
      {title && <h1 className="font-medium lg:text-xl">{title}</h1>}
      {subTitle && <h2 className="text-xs lg:text-sm">{subTitle}</h2>}
    </div>
  </div>
);
