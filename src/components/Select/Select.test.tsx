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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".";

// Mocked events, see https://github.com/radix-ui/primitives/issues/1822
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button ?? 0;
    this.ctrlKey = props.ctrlKey ?? false;
    this.pointerType = props.pointerType ?? "mouse";
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vitest.fn();
window.HTMLElement.prototype.releasePointerCapture = vitest.fn();
window.HTMLElement.prototype.hasPointerCapture = vitest.fn();

const queryItem = (value: string) => screen.queryAllByText(value).at(1);

describe("Select", () => {
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
