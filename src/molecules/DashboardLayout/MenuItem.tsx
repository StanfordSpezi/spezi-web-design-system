//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode, useContext } from "react";
import { useSpeziContext } from "@/SpeziProvider";
import { DashboardContext } from "./DashboardContext";
import { Tooltip } from "../../components/Tooltip";
import { cn } from "../../utils/className";

interface MenuItemProps {
  href: string;
  isActive?: boolean;
  isHighlighted?: boolean;
  icon?: ReactNode;
  label?: string;
  children?: ReactNode;
}

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
              "size-2.5 rounded-full bg-destructive",
              shrinkable &&
                "lg:absolute lg:right-1 lg:top-1 lg:size-1.5 xl:static xl:size-2.5",
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
