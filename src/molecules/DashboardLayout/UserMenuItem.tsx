//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { forwardRef, useContext } from "react";
import { cn } from "@/utils/className";
import { DashboardContext } from "./DashboardContext";
import { Avatar } from "../../components/Avatar";
import { Button, type ButtonProps } from "../../components/Button";
import { type Nil } from "../../utils/misc";

type UserMenuItemProps = Omit<ButtonProps, "name"> & {
  name: Nil<string>;
  img: Nil<string>;
};

export const UserMenuItem = forwardRef<HTMLButtonElement, UserMenuItemProps>(
  ({ name, img, ...props }, ref) => {
    const { shrinkable } = useContext(DashboardContext);
    return (
      <Button
        variant="ghost"
        className={cn(
          "mb-2 mt-auto !p-2 transition",
          shrinkable ?
            "xl:mb-0 xl:w-full xl:justify-start xl:self-start"
          : "lg:mb-0 lg:w-full lg:justify-start lg:self-start",
        )}
        ref={ref}
        {...props}
      >
        <Avatar size="sm" name={name} src={img} />
        <span
          className={cn("truncate text-sm", shrinkable && "lg:hidden xl:block")}
        >
          {name}
        </span>
      </Button>
    );
  },
);
UserMenuItem.displayName = "UserMenuItem";
