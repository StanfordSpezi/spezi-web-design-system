//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  useCallback,
  useState,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";
import { upperFirst } from "@/utils/misc";
import { useOpenState } from "@/utils/useOpenState";
import { Button } from "../Button";
import { IconSearchGrid, type IconSearchGridProps } from "../IconGrid";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../Popover";

interface IconPickerProps
  extends Omit<
      ComponentPropsWithoutRef<typeof PopoverTrigger>,
      "onSelect" | "onOpenChange"
    >,
    ComponentProps<typeof PopoverRoot>,
    IconSearchGridProps {
  value?: IconName;
  defaultValue?: IconName;
  triggerPlaceholder?: string;
}

/**
 * Icon picker component with popover interface.
 *
 * Provides a button trigger that opens a popover containing an IconSearchGrid.
 * Supports both controlled and uncontrolled usage patterns.
 *
 * @example
 * ```tsx
 * // Uncontrolled with default value
 * <IconPicker
 *   defaultValue="home"
 *   onValueChange={(icon) => console.log('Selected:', icon)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled component
 * <IconPicker
 *   value={selectedIcon}
 *   onValueChange={setSelectedIcon}
 *   triggerPlaceholder="Choose an icon"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom trigger
 * <IconPicker onValueChange={handleSelect}>
 *   <Button variant="ghost">
 *     <Plus className="size-4" />
 *     Add Icon
 *   </Button>
 * </IconPicker>
 * ```
 *
 * @example
 * ```tsx
 * // With custom search and icons
 * <IconPicker
 *   icons={brandIcons}
 *   searchPlaceholder="Search brand icons..."
 *   columns={6}
 *   onValueChange={setBrandIcon}
 * />
 * ```
 */
export const IconPicker = ({
  // Popover root props
  open,
  onOpenChange,
  defaultOpen = false,
  modal = false,
  // Icon search grid props
  searchPlaceholder = "Search for an icon...",
  icons,
  onValueChange,
  columns,
  visibleRows,
  rowHeight,
  showTooltip,
  // Trigger props
  value,
  defaultValue,
  triggerPlaceholder = "Select an icon",
  children,
  ...props
}: IconPickerProps) => {
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
    defaultValue,
  );
  const { isOpen, setIsOpen } = useOpenState(defaultOpen);

  const isControlled = value !== undefined;
  const currentIcon = isControlled ? value : selectedIcon;
  const currentOpen = open ?? isOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange, setIsOpen],
  );

  const handleValueChange = useCallback(
    (icon: IconName) => {
      if (!isControlled) {
        setSelectedIcon(icon);
      }
      onValueChange?.(icon);
      handleOpenChange(false);
    },
    [isControlled, onValueChange, handleOpenChange],
  );

  return (
    <PopoverRoot
      open={currentOpen}
      onOpenChange={handleOpenChange}
      modal={modal}
    >
      <PopoverTrigger asChild {...props}>
        {children ?? (
          <Button variant="outline">
            {currentIcon ?
              <>
                <DynamicIcon
                  name={currentIcon}
                  // Lower opacity, since icons tend to be more
                  // visually heavy than text
                  className="size-4.5 opacity-80"
                />{" "}
                {upperFirst(currentIcon.split("-").join(" "))}
              </>
            : triggerPlaceholder}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96 rounded-xl border-black/10 bg-clip-padding pr-2 shadow-xl shadow-black/5">
        <IconSearchGrid
          searchPlaceholder={searchPlaceholder}
          icons={icons}
          onValueChange={handleValueChange}
          columns={columns}
          visibleRows={visibleRows}
          rowHeight={rowHeight}
          showTooltip={showTooltip}
        />
      </PopoverContent>
    </PopoverRoot>
  );
};
