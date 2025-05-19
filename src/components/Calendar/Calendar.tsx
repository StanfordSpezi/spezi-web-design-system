//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isDate, set } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type DateRange,
  DayPicker,
  type DayPickerProps,
  type PropsSingle,
  type PropsSingleRequired,
} from "react-day-picker";
import { buttonVariance } from "@/components/Button";
import { cn } from "@/utils/className";

/**
 * Internal time picker component for the Calendar.
 *
 * Allows selecting hours and minutes to complement the date selection.
 * Used when the Calendar component has showTimePicker enabled.
 *
 * @internal
 */
const TimePicker = ({
  selected,
  onSelect,
}: Pick<PropsSingle | PropsSingleRequired, "selected" | "onSelect">) => {
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
          // @ts-expect-error day-picker expects no ChangeEvent, but that's a fair tradeoff for simpler types
          onSelect?.(newDate, newDate, {}, event);
        }}
        className="focus-ring rounded-sm p-1"
      />
    </div>
  );
};

export type CalendarProps = DayPickerProps & {
  /**
   * Whether to show the time picker below the calendar.
   * Only works in single date selection mode.
   * When enabled, selected time will be preserved when changing dates.
   *
   * @default false
   */
  showTimePicker?: boolean;
};

/**
 * A calendar component for date selection with an optional time picker.
 * Built on top of [react-day-picker](https://react-day-picker.js.org/).
 *
 * @example
 * // Basic usage with single date selection
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 *
 * @example
 * // With time picker
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   showTimePicker
 * />
 */
export const Calendar = (props: CalendarProps) => {
  const {
    className,
    classNames,
    showOutsideDays = true,
    showTimePicker,
    mode,
    ...restProps
  } = props;

  const handleSelect = (
    newDate: Date | Date[] | DateRange | undefined,
    ...args: unknown[]
  ) => {
    if (
      mode === "single" &&
      showTimePicker &&
      props.selected &&
      isDate(newDate)
    ) {
      // Keep the same hour when selecting date
      const adjustedDate = set(newDate, {
        hours: props.selected.getHours(),
        minutes: props.selected.getMinutes(),
      });
      // @ts-expect-error ...args are coming from day-picker, we just forward it
      props.onSelect?.(adjustedDate, ...args);
    } else if (props.mode !== undefined) {
      // @ts-expect-error ...args are coming from day-picker, we just forward it
      props.onSelect?.(newDate, ...args);
    }
  };

  const navButton = cn(
    buttonVariance({ variant: "outline" }),
    "size-7! p-0! opacity-50 hover:opacity-100 z-4",
  );

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        startMonth={new Date(1900, 0)}
        endMonth={new Date(2100, 0)}
        captionLayout="dropdown"
        classNames={{
          months: "relative flex flex-col space-y-4",
          month: "space-y-4",
          dropdown: "focus-ring rounded-sm",
          month_caption: "flex-center pt-1 relative",
          caption_label: "text-sm font-medium",
          dropdowns: "hide-all-hidden flex gap-2 text-sm items-center",
          nav: "space-x-1 flex items-center justify-between absolute top-0 left-0 w-full",
          button_previous: cn(navButton, "left-1"),
          button_next: cn(navButton, "right-1"),
          month_grid: "w-full space-y-1",
          weekdays: "flex",
          weekday: "text-muted-foreground w-9 font-normal text-xs",
          week: "flex w-full mt-2",
          range_end: "rounded-r-md rounded-l-none",
          range_start: "rounded-l-md rounded-r-none",
          range_middle: "rounded-none!",
          day: cn(
            buttonVariance({ variant: "ghost" }),
            "size-9! p-0! text-sm",
            "data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary/80",
          ),
          day_button: "size-full",
          today: "border",
          outside: "text-muted-foreground opacity-50",
          disabled: "text-muted-foreground opacity-50",
          hidden: "invisible",
          ...classNames,
        }}
        components={{
          Chevron: ({ ...props }) =>
            props.orientation === "left" ?
              <ChevronLeft {...props} className="size-4" />
            : <ChevronRight {...props} className="size-4" />,
        }}
        mode={mode}
        // @ts-expect-error handleSelect works with every mode
        onSelect={handleSelect}
        {...restProps}
      />
      {showTimePicker && props.mode === "single" && (
        <TimePicker onSelect={props.onSelect} selected={props.selected} />
      )}
    </>
  );
};
