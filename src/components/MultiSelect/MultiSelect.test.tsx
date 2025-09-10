//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from ".";

describe("MultiSelect", () => {
  it("opens popover and toggles selection with badges", () => {
    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            <MultiSelectItem value="a">Alpha</MultiSelectItem>
            <MultiSelectItem value="b">Beta</MultiSelectItem>
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>,
    );

    // Open the list (button combobox)
    const triggerButtons = screen
      .getAllByRole("combobox")
      .filter((el) => el.tagName.toLowerCase() === "button");
    expect(triggerButtons.length).toBeGreaterThan(0);

    const triggerEl = triggerButtons[0] as HTMLButtonElement;
    fireEvent.click(triggerEl);

    // Select Alpha (pick first match)
    const alphaOptions = screen.getAllByRole("option", { name: "Alpha" });
    fireEvent.click(alphaOptions[0]);

    // Badge appears inside trigger
    expect(within(triggerEl).getByText("Alpha")).toBeInTheDocument();

    // Select Beta
    const betaOptions = screen.getAllByRole("option", { name: "Beta" });
    fireEvent.click(betaOptions[0]);
    expect(within(triggerEl).getByText("Beta")).toBeInTheDocument();
  });

  it("filters items when using the search input", () => {
    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            <MultiSelectItem value="alpha">Alpha</MultiSelectItem>
            <MultiSelectItem value="bravo">Bravo</MultiSelectItem>
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>,
    );

    const triggerButtons = screen
      .getAllByRole("combobox")
      .filter((el) => el.tagName.toLowerCase() === "button");
    expect(triggerButtons.length).toBeGreaterThan(0);

    const triggerEl = triggerButtons[0] as HTMLButtonElement;
    fireEvent.click(triggerEl);

    const inputBoxes = screen
      .getAllByRole("combobox")
      .filter((el) => el.tagName.toLowerCase() === "input");
    expect(inputBoxes.length).toBeGreaterThan(0);

    const inputEl = inputBoxes[0] as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: "bra" } });

    expect(
      screen.queryByRole("option", { name: "Alpha" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bravo" })).toBeInTheDocument();
  });
});
