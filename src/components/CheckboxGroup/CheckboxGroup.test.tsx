//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { CheckboxGroup } from "./CheckboxGroup";

describe("CheckboxGroup component", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("renders all options with labels", () => {
    render(<CheckboxGroup options={options} />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("respects the defaultValue prop", () => {
    render(<CheckboxGroup options={options} defaultValue={["option2"]} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it("respects multiple defaultValues", () => {
    render(
      <CheckboxGroup options={options} defaultValue={["option1", "option3"]} />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  it("respects the value prop (controlled component)", () => {
    render(<CheckboxGroup options={options} value={["option3"]} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  it("calls onChange when a checkbox is selected", () => {
    const handleChange = vitest.fn();

    render(<CheckboxGroup options={options} onChange={handleChange} />);

    const secondCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(secondCheckbox);

    expect(handleChange).toHaveBeenCalledWith(["option2"]);
  });

  it("allows selecting multiple options", () => {
    const handleChange = vitest.fn();

    render(<CheckboxGroup options={options} onChange={handleChange} />);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(handleChange).toHaveBeenCalledWith(["option1"]);

    // Reset mock to check next call clearly
    handleChange.mockReset();

    // Now select second checkbox while first is already selected
    fireEvent.click(checkboxes[1]);
    expect(handleChange).toHaveBeenCalledWith(["option1", "option2"]);
  });

  it("allows deselecting options", () => {
    const handleChange = vitest.fn();

    render(
      <CheckboxGroup
        options={options}
        defaultValue={["option1", "option2"]}
        onChange={handleChange}
      />,
    );

    const firstCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(firstCheckbox);

    expect(handleChange).toHaveBeenCalledWith(["option2"]);
  });

  it("accepts numeric values", () => {
    const numericOptions = [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
    ];

    const handleChange = vitest.fn();

    render(
      <CheckboxGroup
        options={numericOptions}
        value={[1]}
        onChange={handleChange}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();

    fireEvent.click(checkboxes[1]);
    expect(handleChange).toHaveBeenCalledWith([1, 2]);
  });

  it("applies custom className to the root element", () => {
    render(<CheckboxGroup options={options} className="test-class" />);

    const root = screen
      .getAllByRole("checkbox")[0]
      .closest("div[role='group']");
    expect(root).toHaveClass("test-class");
  });

  it("works with ReactNode labels", () => {
    const optionsWithReactNodes = [
      {
        label: <div data-testid="custom-label">Custom Label</div>,
        value: "custom",
      },
      { label: "Regular Label", value: "regular" },
    ];

    render(<CheckboxGroup options={optionsWithReactNodes} />);

    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
    expect(screen.getByText("Regular Label")).toBeInTheDocument();
  });

  it("respects disabled options", () => {
    const optionsWithDisabled = [
      { label: "Enabled", value: "enabled" },
      { label: "Disabled", value: "disabled", disabled: true },
    ];

    render(<CheckboxGroup options={optionsWithDisabled} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).not.toBeDisabled();
    expect(checkboxes[1]).toBeDisabled();
  });
});
