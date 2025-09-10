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
  MultiSelectSeparator,
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

  it("removes a value when clicking a badge (clickToRemove)", () => {
    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="alpha">Alpha</MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>,
    );

    const trigger = screen
      .getAllByRole("combobox")
      .find((el) => el.tagName.toLowerCase() === "button") as HTMLButtonElement;
    fireEvent.click(trigger);

    const option = screen.getByRole("option", { name: "Alpha" });
    fireEvent.click(option);
    const badge = within(trigger).getByText("Alpha");
    expect(badge).toBeInTheDocument();

    // Clicking badge should remove it
    fireEvent.click(badge);
    expect(within(trigger).queryByText("Alpha")).not.toBeInTheDocument();
  });

  it("renders without search input when search={false}", () => {
    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." />
        </MultiSelectTrigger>
        <MultiSelectContent search={false}>
          <MultiSelectItem value="alpha">Alpha</MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>,
    );

    const trigger = screen
      .getAllByRole("combobox")
      .find((el) => el.tagName.toLowerCase() === "button") as HTMLButtonElement;
    fireEvent.click(trigger);

    // No input combobox should exist, only the trigger button combobox
    const comboRoles = screen.getAllByRole("combobox");
    const inputCombos = comboRoles.filter(
      (el) => el.tagName.toLowerCase() === "input",
    );
    expect(inputCombos.length).toBe(0);
  });

  it("overflowBehavior='cutoff' hides extra badges and shows +N overflow", () => {
    // Mock client/scroll widths to force overflow
    const measure = vi
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(100);
    const scroll = vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockReturnValue(300);

    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." overflowBehavior="cutoff" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            <MultiSelectItem value="a">Alpha</MultiSelectItem>
            <MultiSelectItem value="b">Beta</MultiSelectItem>
            <MultiSelectItem value="c">Charlie</MultiSelectItem>
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>,
    );

    const trigger = screen
      .getAllByRole("combobox")
      .find((el) => el.tagName.toLowerCase() === "button") as HTMLButtonElement;
    fireEvent.click(trigger);

    ["Alpha", "Beta", "Charlie"].forEach((name) => {
      fireEvent.click(screen.getByRole("option", { name }));
    });

    // Some badges will be hidden via inline style; but +N should show.
    // So, assert the overflow +N badge is present.
    expect(within(trigger).getByText(/\+\d+/)).toBeInTheDocument();

    measure.mockRestore();
    scroll.mockRestore();
  });

  it("throws if hook is used outside provider (context guard)", () => {
    // Intentionally reach into the file by importing a component that uses the hook without provider
    const Orphan = () => {
      // MultiSelectItem calls useMultiSelectContext in render
      return (
        <div>
          <MultiSelectItem value="x">X</MultiSelectItem>
        </div>
      );
    };

    // Expect render to throw the guard error
    expect(() => render(<Orphan />)).toThrow(
      /useMultiSelectContext must be used within a MultiSelectContext/,
    );
  });

  it("renders MultiSelectSeparator inside content", () => {
    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup heading="A">
            <MultiSelectItem value="a">Alpha</MultiSelectItem>
          </MultiSelectGroup>
          <MultiSelectSeparator />
          <MultiSelectGroup heading="B">
            <MultiSelectItem value="b">Beta</MultiSelectItem>
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>,
    );

    const trigger = screen
      .getAllByRole("combobox")
      .find((el) => el.tagName.toLowerCase() === "button") as HTMLButtonElement;
    fireEvent.click(trigger);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("does not remove a value when clickToRemove is false", () => {
    render(
      <MultiSelect>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Pick..." clickToRemove={false} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="alpha">Alpha</MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>,
    );

    const trigger = screen
      .getAllByRole("combobox")
      .find((el) => el.tagName.toLowerCase() === "button") as HTMLButtonElement;
    fireEvent.click(trigger);

    const option = screen.getByRole("option", { name: "Alpha" });
    fireEvent.click(option);

    const badge = within(trigger).getByText("Alpha");
    expect(badge).toBeInTheDocument();

    // Clicking the badge should do nothing when clickToRemove is false
    fireEvent.click(badge);
    expect(within(trigger).getByText("Alpha")).toBeInTheDocument();
  });
});
