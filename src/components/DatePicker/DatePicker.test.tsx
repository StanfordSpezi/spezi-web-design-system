//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { DatePicker } from ".";

describe("DatePicker", () => {
  it("renders date picker", () => {
    const onSelect = vitest.fn();
    render(
      <DatePicker mode="single" selected={undefined} onSelect={onSelect} />,
    );

    const queryGoToPrevMonth = () =>
      screen.queryByRole("button", {
        name: "Go to previous month",
      });

    expect(queryGoToPrevMonth()).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Pick a date" });
    fireEvent.click(trigger);

    expect(queryGoToPrevMonth()).toBeInTheDocument();
  });
});
