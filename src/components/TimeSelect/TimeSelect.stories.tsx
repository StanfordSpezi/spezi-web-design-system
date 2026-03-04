//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { useState } from "react";
import { type TimeSelectValue, TimeSelect } from "./TimeSelect";

const meta: Meta<typeof TimeSelect> = {
  title: "Components/TimeSelect",
  component: TimeSelect,
};

export default meta;

export const Default = () => {
  const [time, setTime] = useState<TimeSelectValue | null>(null);
  return (
    <div className="w-[220px]">
      <TimeSelect value={time} onChange={setTime} />
      {time && (
        <p className="text-muted-foreground mt-2 text-sm">
          Selected: {time.hours}:{time.minutes.toString().padStart(2, "0")}
        </p>
      )}
    </div>
  );
};

export const WithInitialValue = () => {
  const [time, setTime] = useState<TimeSelectValue>({
    hours: 9,
    minutes: 30,
  });
  return (
    <div className="w-[220px]">
      <TimeSelect value={time} onChange={setTime} />
    </div>
  );
};

export const CustomPlaceholder = () => {
  const [time, setTime] = useState<TimeSelectValue | null>(null);
  return (
    <div className="w-[220px]">
      <TimeSelect
        value={time}
        onChange={setTime}
        placeholder="Pick a time..."
      />
    </div>
  );
};

export const Disabled = () => {
  const [time, setTime] = useState<TimeSelectValue | null>(null);
  return (
    <div className="w-[220px]">
      <TimeSelect value={time} onChange={setTime} disabled />
    </div>
  );
};
