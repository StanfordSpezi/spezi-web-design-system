//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { IconName } from "lucide-react/dynamic";
import { useDebounce } from "use-debounce";
import { Input } from "../Input";
import { type IconData, IconGrid } from "./IconGrid";

export interface IconSearchGridProps {
  searchPlaceholder: string;
  icons?: IconData[];
  onValueChange?: (value: IconName) => void;
  columns?: number;
  visibleRows?: number;
  rowHeight?: number;
}

export const IconSearchGrid = ({
  searchPlaceholder,
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
