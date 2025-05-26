//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup component", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("renders all options with labels", () => {
    render(<RadioGroup options={options} />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("respects the defaultValue prop", () => {
    render(<RadioGroup options={options} defaultValue="option2" />);

    const radios = screen.getAllByRole("radio");
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it("respects the value prop (controlled component)", () => {
    render(<RadioGroup options={options} value="option3" />);

    const radios = screen.getAllByRole("radio");
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).not.toBeChecked();
    expect(radios[2]).toBeChecked();
  });

  it("calls onChange when a radio is selected", () => {
    const handleChange = vitest.fn();

    render(<RadioGroup options={options} onChange={handleChange} />);

    const secondRadio = screen.getAllByRole("radio")[1];
    fireEvent.click(secondRadio);

    expect(handleChange).toHaveBeenCalledWith("option2");
  });

  it("works with ReactNode labels", () => {
    const optionsWithReactNodes = [
      {
        label: <div data-testid="custom-label">Custom Label</div>,
        value: "custom",
      },
      { label: "Regular Label", value: "regular" },
    ];

    render(<RadioGroup options={optionsWithReactNodes} />);

    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
    expect(screen.getByText("Regular Label")).toBeInTheDocument();
  });
});
