//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".";

const queryItem = (value: string) => screen.queryAllByText(value).at(1);

describe("Select", () => {
  it("forwards id from Select to SelectTrigger", () => {
    render(
      <Select id="test-id">
        <SelectTrigger>
          <SelectValue placeholder="Organizations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Lorem">Lorem</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("id", "test-id");
  });

  it("allows SelectTrigger id prop to override Select id", () => {
    render(
      <Select id="select-id">
        <SelectTrigger id="trigger-id">
          <SelectValue placeholder="Organizations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Lorem">Lorem</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("id", "trigger-id");
  });

  it("renders accessible select", async () => {
    render(
      <Select>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Organizations" />
        </SelectTrigger>
        <SelectContent>
          {["Lorem", "Ipsum", "Sir", "Dolor", "Amet"].map((organization) => (
            <SelectItem value={organization} key={organization}>
              {organization}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    const trigger = screen.getByRole("combobox", { name: "Trigger" });
    const pointerState = await userEvent.pointer({ target: trigger });
    await userEvent.click(trigger, {
      pointerState,
    });

    expect(screen.queryByRole("listbox")).toBeInTheDocument();
    const sirOption = queryItem("Sir");
    expect(sirOption).toBeInTheDocument();
    // @ts-expect-error sirOption is checked to be in the document
    await userEvent.click(sirOption);

    // just in the hidden select
    expect(screen.queryAllByText("Ipsum")).toHaveLength(1);
    // both hidden select and trigger value
    expect(screen.queryAllByText("Sir")).toHaveLength(2);
  });
});
