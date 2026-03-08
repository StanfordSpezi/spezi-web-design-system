//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

const minuteValues = [0, 30] as const;

type TimeSelectMinute = (typeof minuteValues)[number];

export interface TimeSelectValue {
  hours: number;
  minutes: TimeSelectMinute;
}

export interface TimeSelectProps
  extends Omit<
    ComponentProps<typeof Select>,
    "value" | "onValueChange" | "children"
  > {
  id?: string;
  value?: TimeSelectValue | null;
  onChange: (value: TimeSelectValue) => void;
  placeholder?: string;
  className?: string;
}

const formatOptionValue = (hours: number, minutes: TimeSelectMinute) => {
  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");
  return `${hoursString}:${minutesString}`;
};

const formatOptionLabel = (hours: number, minutes: TimeSelectMinute) => {
  const date = new Date(2000, 0, 1, hours, minutes);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
};

const timeOptions: Array<{
  value: string;
  label: string;
  hours: number;
  minutes: TimeSelectMinute;
}> = [];

for (let hour = 0; hour < 24; hour += 1) {
  for (const minutes of minuteValues) {
    timeOptions.push({
      value: formatOptionValue(hour, minutes),
      label: formatOptionLabel(hour, minutes),
      hours: hour,
      minutes,
    });
  }
}

/**
 * A time picker component that renders a Select dropdown with 48 half-hour time slots
 * covering the full 24-hour day. Labels are formatted using locale-aware time formatting.
 *
 * @example
 * ```tsx
 * const [time, setTime] = useState<TimeSelectValue | null>(null);
 *
 * <TimeSelect
 *   value={time}
 *   onChange={setTime}
 *   placeholder="Select time"
 * />
 * ```
 */
export const TimeSelect = ({
  id,
  value,
  onChange,
  placeholder = "Select time",
  className,
  ...props
}: TimeSelectProps) => {
  const handleValueChange = (nextValue: string) => {
    const [hoursPart, minutesPart] = nextValue.split(":");
    const hours = Number.parseInt(hoursPart, 10);
    const minutes = Number.parseInt(minutesPart, 10) as TimeSelectMinute;

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      !minuteValues.includes(minutes)
    ) {
      return;
    }

    onChange({ hours, minutes });
  };

  const getSelectedValue = () => {
    if (!value) {
      return undefined;
    }

    if (
      value.hours < 0 ||
      value.hours > 23 ||
      !minuteValues.includes(value.minutes)
    ) {
      return undefined;
    }

    return formatOptionValue(value.hours, value.minutes);
  };

  return (
    <Select
      value={getSelectedValue()}
      onValueChange={handleValueChange}
      {...props}
    >
      <SelectTrigger id={id} className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            itemText={option.label}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
