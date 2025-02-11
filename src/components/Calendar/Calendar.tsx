//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isDate, set } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerSingleProps } from "react-day-picker";
import { cn } from "../../utils/className";
import { buttonVariance } from "../Button";

const Footer = ({
  selected,
  onSelect,
}: Pick<CalendarProps, "selected" | "onSelect">) => {
  const value = isDate(selected) ? selected : undefined;
  return (
    <div className="flex-center pb-3">
      <input
        type="time"
        data-testid="dateInput"
        value={value?.toTimeString().slice(0, 5)}
        onChange={(event) => {
          event.stopPropagation();
          event.preventDefault();
          const stringStamp = event.currentTarget.value;
          const hours = parseInt(stringStamp.slice(0, 2));
          const minutes = parseInt(stringStamp.slice(3, 5));
          const newDate = new Date(value?.getTime() ?? Date.now());
          newDate.setHours(hours, minutes);
          onSelect?.(newDate);
        }}
        className="focus-ring rounded p-1"
      />
    </div>
  );
};

export type CalendarProps = Omit<DayPickerSingleProps, "onSelect"> & {
  showTimePicker?: boolean;
  onSelect?: (date: Date | undefined) => void;
};

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  showTimePicker,
  onSelect,
  ...props
}: CalendarProps) => {
  const handleSelect = (newDate: Date | undefined) => {
    if (showTimePicker && selected && newDate) {
      // Keep the same hour when selecting date
      onSelect?.(
        set(newDate, {
          hours: selected.getHours(),
          minutes: selected.getMinutes(),
        }),
      );
    } else {
      onSelect?.(newDate);
    }
  };

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        captionLayout="dropdown-buttons"
        fromYear={1900}
        toYear={2100}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          vhidden: "hidden",
          caption_dropdowns: "hide-all-hidden flex gap-2 text-sm items-center",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariance({ variant: "outline" }),
            "!size-7 !p-0 opacity-50 hover:opacity-100",
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs",
          row: "flex w-full mt-2",
          cell: "size-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariance({ variant: "ghost" }),
            "!size-9 !p-0 aria-selected:opacity-100",
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeft className="size-4" />,
          IconRight: () => <ChevronRight className="size-4" />,
        }}
        selected={selected}
        onSelect={handleSelect}
        {...props}
      />
      {showTimePicker && <Footer onSelect={onSelect} selected={selected} />}
    </>
  );
};
