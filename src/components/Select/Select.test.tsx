//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vitest } from "vitest";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
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

  it("renders groups and separators", async () => {
    render(
      <Select>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup heading="Fruits">
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup heading="Vegetables">
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    // Both the hidden native select and the visible popover render group labels
    expect(screen.getAllByText("Fruits").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Vegetables").length).toBeGreaterThanOrEqual(1);
  });

  it("supports search", async () => {
    render(
      <Select search>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  it("supports custom search config", async () => {
    render(
      <Select
        search={{ placeholder: "Type here...", emptyMessage: "Nothing found" }}
      >
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("supports create option", async () => {
    const onCreateOption = vitest.fn();
    render(
      <Select search create={{ onCreateOption }}>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "Mango");

    const createOption = screen.getByText('Create "Mango"');
    expect(createOption).toBeInTheDocument();
  });

  it("uses formatValue for unknown values", () => {
    render(
      <Select value="custom-123" formatValue={(v) => `ID: ${v}`}>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("ID: custom-123")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(
      <Select disabled>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();
  });

  it("fires onValueChange callback", async () => {
    const onValueChange = vitest.fn();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger aria-label="Trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const appleOption = queryItem("Apple");
    // @ts-expect-error appleOption exists
    await userEvent.click(appleOption);

    expect(onValueChange).toHaveBeenCalledWith("apple");
  });
});
