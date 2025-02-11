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
import { cn } from "../../utils/className";
import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";

export type DatePickerProps = ComponentProps<typeof Calendar>;

export const DatePicker = (props: DatePickerProps) => {
  const { selected, showTimePicker } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "!w-full !justify-start !bg-surface-primary !text-left !text-sm",
            !selected && "!text-muted-foreground",
          )}
        >
          <CalendarIcon className="size-4" />
          {selected && isDate(selected) ?
            format(selected, `PPP${showTimePicker ? " - p" : ""}`)
          : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-auto !p-0">
        <Calendar {...props} />
      </PopoverContent>
    </Popover>
  );
};
