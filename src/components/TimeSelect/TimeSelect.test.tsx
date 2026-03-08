//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { TimeSelect } from ".";

const formatExpected = (hours: number, minutes: number) =>
  new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

describe("TimeSelect", () => {
  it("renders with placeholder", () => {
    render(<TimeSelect value={null} onChange={() => undefined} />);
    const element = screen.getByRole("combobox");
    expect(element).toBeInTheDocument();
    expect(screen.getByText("Select time")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(
      <TimeSelect
        value={null}
        onChange={() => undefined}
        placeholder="Choose time"
      />,
    );
    expect(screen.getByText("Choose time")).toBeInTheDocument();
  });

  it("displays selected time value in trigger", () => {
    render(
      <TimeSelect
        value={{ hours: 14, minutes: 30 }}
        onChange={() => undefined}
      />,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(formatExpected(14, 30));
  });

  it("displays midnight correctly", () => {
    render(
      <TimeSelect
        value={{ hours: 0, minutes: 0 }}
        onChange={() => undefined}
      />,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(formatExpected(0, 0));
  });

  it("displays noon correctly", () => {
    render(
      <TimeSelect
        value={{ hours: 12, minutes: 0 }}
        onChange={() => undefined}
      />,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(formatExpected(12, 0));
  });
});
