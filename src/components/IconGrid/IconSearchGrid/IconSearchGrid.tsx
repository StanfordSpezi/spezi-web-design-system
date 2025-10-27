//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useDebounce } from "use-debounce";
import { Input } from "../../Input";
import { IconGrid, type IconGridProps } from "../IconGrid";

export interface IconSearchGridProps extends Omit<IconGridProps, "searchTerm"> {
  searchPlaceholder?: string;
}

/**
 * Icon grid with integrated search input and debounced filtering.
 *
 * Combines a search input with the IconGrid component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <IconSearchGrid onValueChange={(icon) => setIcon(icon)} />
 * ```
 *
 * @example
 * ```tsx
 * // Custom placeholder and dimensions
 * <IconSearchGrid
 *   searchPlaceholder="Find your perfect icon..."
 *   columns={8}
 *   visibleRows={6}
 *   onValueChange={handleSelection}
 * />
 * ```
 */
export const IconSearchGrid = ({
  searchPlaceholder = "Search for an icon...",
  ...iconGridProps
}: IconSearchGridProps) => {
  const [searchTerm, setSearchTerm] = useDebounce("", 200);
  return (
    <div className="flex flex-col gap-4">
      <div className="pr-2">
        <Input
          type="search"
          aria-label="Search icons"
          placeholder={searchPlaceholder}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="[&::-webkit-search-cancel-button]:appearance-none"
        />
      </div>
      <IconGrid searchTerm={searchTerm} {...iconGridProps} />
    </div>
  );
};
