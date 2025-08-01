//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { rankings, rankItem } from "@tanstack/match-sorter-utils";
import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Tooltip } from "radix-ui";
import { memo, useMemo, useState } from "react";
import { times, upperFirst } from "@/utils/misc";
import { EmptyState } from "../EmptyState";
import { type iconsData } from "../IconPicker/iconsData";
import { ScrollArea } from "../ScrollArea";
import { Skeleton } from "../Skeleton";
import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "../Tooltip";

export type IconData = (typeof iconsData)[number];

interface IconGridSkeletonProps {
  columns: number;
  visibleRows: number;
  rowHeight: number;
}

const IconGridSkeleton = ({
  columns,
  visibleRows,
  rowHeight,
}: IconGridSkeletonProps) => {
  return (
    <div
      className="grid w-full pr-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {times(columns * visibleRows, (index) => (
        <div
          key={index}
          className="flex-center size-full"
          style={{ height: rowHeight }}
        >
          <Skeleton className="size-2/3 rounded-sm" />
        </div>
      ))}
    </div>
  );
};

interface IconRendererProps {
  name: IconName;
  showTooltip?: boolean;
}

const IconRenderer = memo(({ name, showTooltip }: IconRendererProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex-center relative size-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DynamicIcon name={name} className="size-2/3 opacity-80" />
      {/* We don't want to render the tooltip by default to make sure the icon picker is performant */}
      {isHovered && showTooltip && (
        <TooltipRoot disableHoverableContent>
          <TooltipTrigger asChild>
            <div
              className="flex-center absolute inset-0"
              onMouseLeave={() => setIsHovered(false)}
            />
          </TooltipTrigger>
          <Tooltip.Portal>
            <TooltipContent
              sideOffset={2}
              className="!bg-inverted text-inverted-foreground py-1 text-xs tracking-wide shadow-md"
            >
              {upperFirst(name.split("-").join(" "))}
            </TooltipContent>
          </Tooltip.Portal>
        </TooltipRoot>
      )}
    </div>
  );
});

IconRenderer.displayName = "IconRenderer";

interface IconRowProps {
  icons: IconData[];
  onValueChange?: (value: IconName) => void;
  columns: number;
  showTooltip?: boolean;
}

const IconRow = memo(
  ({ icons, onValueChange, columns, showTooltip }: IconRowProps) => {
    return (
      <div
        className="grid size-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: "100%",
        }}
      >
        {icons.map((icon) => (
          <button
            key={icon.name}
            aria-label={upperFirst(icon.name.split("-").join(" "))}
            className="focus:bg-muted hover:bg-muted rounded-md transition outline-none"
            onClick={() => onValueChange?.(icon.name as IconName)}
          >
            <IconRenderer
              name={icon.name as IconName}
              showTooltip={showTooltip}
            />
          </button>
        ))}
      </div>
    );
  },
);

IconRow.displayName = "IconRow";

interface GridVirtualizerProps {
  icons: IconData[];
  onValueChange?: (value: IconName) => void;
  columns: number;
  rowHeight: number;
  showTooltip?: boolean;
  getScrollElement: () => HTMLDivElement | null;
}

const GridVirtualizer = ({
  icons,
  onValueChange,
  columns,
  rowHeight,
  showTooltip,
  getScrollElement,
}: GridVirtualizerProps) => {
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(icons.length / columns),
    getScrollElement,
    estimateSize: () => rowHeight,
    overscan: 4,
  });

  // Pre-compute and memoize all row data to ensure stable references
  const rowDataMap = useMemo(() => {
    const map = new Map<number, IconData[]>();
    const totalRows = Math.ceil(icons.length / columns);

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const startIndex = rowIndex * columns;
      const endIndex = startIndex + columns;
      map.set(rowIndex, icons.slice(startIndex, endIndex));
    }
    return map;
  }, [icons, columns]);

  return (
    <div
      className="relative w-full"
      style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const rowIcons = rowDataMap.get(virtualItem.index) ?? [];
        return (
          <div
            key={virtualItem.key}
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <IconRow
              icons={rowIcons}
              onValueChange={onValueChange}
              columns={columns}
              showTooltip={showTooltip}
            />
          </div>
        );
      })}
    </div>
  );
};

export interface IconGridProps {
  searchTerm?: string;
  icons?: IconData[];
  onValueChange?: (value: IconName) => void;
  columns?: number;
  visibleRows?: number;
  rowHeight?: number;
  showTooltip?: boolean;
}

/**
 * Virtualized grid component for displaying and selecting icons.
 *
 * Features search filtering, virtualization for performance, and customizable dimensions.
 * Uses React Query to load icon data when no custom icons are provided.
 *
 * @example
 * // Basic usage with all icons
 * <IconGrid onValueChange={(icon) => setSelectedIcon(icon)} />
 *
 * @example
 * // With custom icons and search
 * <IconGrid
 *   icons={customIcons}
 *   searchTerm="home"
 *   onValueChange={handleIconSelect}
 * />
 *
 * @example
 * // Custom dimensions
 * <IconGrid
 *   columns={10}
 *   visibleRows={4}
 *   rowHeight={40}
 *   showTooltip={false}
 * />
 */
export const IconGrid = ({
  searchTerm = "",
  icons,
  onValueChange,
  columns = 8,
  visibleRows = 8,
  rowHeight = 32,
  showTooltip = true,
}: IconGridProps) => {
  const [scrollViewRef, setScrollViewRef] = useState<HTMLDivElement | null>(
    null,
  );
  const { data: allIcons, isLoading } = useQuery({
    queryKey: ["icons-data"],
    queryFn: async () => {
      const { iconsData } = await import("../IconPicker/iconsData");
      return iconsData;
    },
    staleTime: "static",
    enabled: !icons,
  });
  const iconsToUse = icons ?? allIcons;

  const filteredIcons = useMemo(() => {
    if (!iconsToUse) return [];
    if (searchTerm.trim() === "") return iconsToUse;

    const rankedItems = iconsToUse.map((icon) => {
      const rankingInfo = rankItem(icon, searchTerm, {
        accessors: [
          { accessor: (item) => item.name, threshold: rankings.CONTAINS },
          {
            accessor: (item) => item.tags.join(" "),
            threshold: rankings.WORD_STARTS_WITH,
          },
          {
            accessor: (item) => item.categories.join(" "),
            threshold: rankings.WORD_STARTS_WITH,
          },
        ],
      });
      return { icon, rankingInfo };
    });
    const passedItems = rankedItems.filter((item) => item.rankingInfo.passed);
    const sortedItems = passedItems.sort(
      (a, b) => b.rankingInfo.rank - a.rankingInfo.rank,
    );
    return sortedItems.map((item) => item.icon);
  }, [searchTerm, iconsToUse]);

  if (isLoading) {
    return (
      <IconGridSkeleton
        columns={columns}
        visibleRows={visibleRows}
        rowHeight={rowHeight}
      />
    );
  }

  if (filteredIcons.length === 0) {
    return (
      <EmptyState
        entityName="icon"
        className="flex-center"
        style={{ height: rowHeight * visibleRows }}
      />
    );
  }

  return (
    <TooltipProvider>
      <ScrollArea
        type="always"
        scrollViewRef={setScrollViewRef}
        className="pr-2"
        style={{ height: rowHeight * visibleRows }}
      >
        <GridVirtualizer
          icons={filteredIcons}
          onValueChange={onValueChange}
          columns={columns}
          rowHeight={rowHeight}
          showTooltip={showTooltip}
          getScrollElement={() => scrollViewRef}
        />
      </ScrollArea>
    </TooltipProvider>
  );
};
