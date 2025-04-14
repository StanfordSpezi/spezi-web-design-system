//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { addDays } from "date-fns";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};

export default meta;

export const Default = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
};

export const WithTimePicker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar mode="single" selected={date} onSelect={setDate} showTimePicker />
  );
};

export const Range = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  return <Calendar mode="range" selected={date} onSelect={setDate} />;
};
