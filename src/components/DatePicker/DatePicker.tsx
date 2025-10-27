//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { format, isDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { PopoverRoot, PopoverTrigger, PopoverContent } from "../Popover";

export type DatePickerProps = ComponentProps<typeof Calendar>;

/**
 * {@link Calendar} component displayed within a popover triggered by input-like button.
 */
export const DatePicker = (props: DatePickerProps) => {
  const { showTimePicker } = props;
  const selected = props.mode !== undefined ? props.selected : null;
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-surface-primary! w-full! justify-start! text-left! text-sm!",
            !selected && "text-muted-foreground!",
          )}
        >
          <CalendarIcon className="size-4" />
          {selected && isDate(selected) ?
            format(selected, `PPP${showTimePicker ? " - p" : ""}`)
          : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto! p-0!">
        <Calendar {...props} />
      </PopoverContent>
    </PopoverRoot>
  );
};
