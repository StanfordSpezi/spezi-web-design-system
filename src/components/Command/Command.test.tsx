//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from ".";

describe("Command", () => {
  it("renders list and filters via input value (client-side)", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="All">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );

    // Both items visible initially
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Calculator")).toBeInTheDocument();

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Calc" } });

    // Calendar should be filtered out by cmdk, Calculator remains
    expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
    expect(screen.getByText("Calculator")).toBeInTheDocument();
  });

  it("can be placed inside a dialog wrapper", () => {
    render(
      <CommandDialog open>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Group">
            <CommandItem>Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>,
    );

    // Dialog content should be present
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    // Command input should be reachable
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
