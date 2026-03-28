//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Monitor, Moon, Sun } from "lucide-react";
import { type ComponentProps } from "react";
import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { useTheme } from "@/theme/useTheme";
import { cn } from "@/utils/className";

interface ThemeToggleProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  /**
   * Controls what is displayed as the trigger button label.
   * - `"icon"` (default): shows a Sun/Moon icon based on the resolved theme
   * - `"label"`: shows "Light", "Dark", or "System" text
   * - `"both"`: shows both icon and label
   */
  display?: "icon" | "label" | "both";
}

const themeLabels = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

/**
 * A dropdown menu toggle for switching between light, dark, and system theme modes.
 *
 * Uses the {@link useTheme} hook internally and must be rendered within a {@link SpeziProvider}.
 *
 * @example
 * ```tsx
 * // Icon-only button (default)
 * <ThemeToggle />
 *
 * // With text label
 * <ThemeToggle display="label" />
 *
 * // Custom variant and size
 * <ThemeToggle variant="outline" size="sm" />
 * ```
 */
export const ThemeToggle = ({
  display = "icon",
  className,
  variant = "ghost",
  size = "default",
  ...props
}: ThemeToggleProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const showIcon = display === "icon" || display === "both";
  const showLabel = display === "label" || display === "both";

  const ThemeIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-slot="theme-toggle"
          variant={variant}
          size={showIcon && !showLabel ? "round" : size}
          className={cn(showIcon && !showLabel && "size-10", className)}
          {...props}
        >
          {showIcon && <ThemeIcon className="size-4" />}
          {showLabel && themeLabels[theme]}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
