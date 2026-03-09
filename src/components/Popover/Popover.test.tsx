//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseX,
} from ".";

describe("Popover", () => {
  it("renders accessible popover", async () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverRoot>,
    );

    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const dialog2 = await screen.findByRole("dialog");
    expect(dialog2).toBeInTheDocument();
  });

  it("renders header, title, and description", async () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Settings</PopoverTitle>
            <PopoverDescription>Configure preferences</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </PopoverRoot>,
    );

    expect(await screen.findByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Configure preferences")).toBeInTheDocument();
  });

  it("renders close button", async () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>
          <PopoverCloseX />
          Content
        </PopoverContent>
      </PopoverRoot>,
    );

    const closeButton = await screen.findByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();
  });

  it("renders content with arrow", async () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent arrow>Arrow content</PopoverContent>
      </PopoverRoot>,
    );

    expect(await screen.findByText("Arrow content")).toBeInTheDocument();
  });
});
