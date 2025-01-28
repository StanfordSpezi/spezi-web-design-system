//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { CircleAlert } from "lucide-react";
import { type ReactNode } from "react";
import { Badge, type BadgeProps } from "@/components/Badge";

export interface ErrorStateProps extends BadgeProps {
  /**
   * Name of the presented missing data entity
   * Provide pluralized and lowercased
   * @example "users"
   * */
  entityName?: ReactNode;
}

/**
 * Component for surfacing inline errors
 * Most often used for data queries
 * */
export const ErrorState = ({
  children,
  entityName,
  ...props
}: ErrorStateProps) => (
  <Badge size="lg" variant="destructiveLight" role="alert" {...props}>
    <CircleAlert />
    <span>
      {children ?? <>Fetching {entityName} failed. Please try again later.</>}
    </span>
  </Badge>
);
