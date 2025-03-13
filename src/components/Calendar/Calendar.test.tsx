//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { Calendar } from ".";

describe("Calendar", () => {
  it("renders calendar", () => {
    const date = new Date(2024, 6, 27);
    const onSelect = vitest.fn();
    render(
      <Calendar
        defaultMonth={date}
        mode="single"
        selected={date}
        onSelect={onSelect}
      />,
    );

    const goToPrevMonth = screen.getByRole("button", {
      name: "Go to previous month",
    });
    expect(goToPrevMonth).toBeInTheDocument();
    const goTo24th = screen.getByRole("gridcell", {
      name: "24",
    });
    expect(goTo24th).toBeInTheDocument();
  });

  it("supports time selection", () => {
    const date = new Date(2024, 6, 27, 12, 0);
    const onSelect = vitest.fn();
    render(
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        showTimePicker
      />,
    );

    const timeInput = screen.getByTestId("dateInput");
    fireEvent.change(timeInput, { target: { value: "01:01" } });

    expect(onSelect).toHaveBeenCalledWith(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 1),
    );
  });
});
