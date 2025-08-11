//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/tests/helpers";
import { type IconData } from "../IconGrid";
import { IconPicker } from "./IconPicker";

const mockIcons: IconData[] = [
  { name: "bird", categories: [], tags: [] },
  { name: "cat", categories: [], tags: [] },
  { name: "dog", categories: [], tags: [] },
  { name: "rabbit", categories: [], tags: [] },
  { name: "rat", categories: [], tags: [] },
];

describe("IconPicker", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      value: 800,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      value: 800,
    });
  });

  it("renders trigger button", () => {
    renderWithProviders(<IconPicker icons={mockIcons} />);

    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
  });

  it("renders trigger button with custom placeholder", () => {
    renderWithProviders(
      <IconPicker icons={mockIcons} triggerPlaceholder="Pick icon" />,
    );

    const trigger = screen.getByRole("button", { name: "Pick icon" });
    expect(trigger).toBeInTheDocument();
  });

  it("shows selected icon in trigger when defaultValue is provided", () => {
    renderWithProviders(<IconPicker icons={mockIcons} defaultValue="bird" />);

    const trigger = screen.getByRole("button", { name: /bird/i });
    expect(trigger).toBeInTheDocument();
  });

  it("opens popover when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IconPicker icons={mockIcons} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
  });

  it("closes popover and updates trigger when icon is selected", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IconPicker icons={mockIcons} />);

    // Open popover
    const trigger = screen.getByRole("button");
    await user.click(trigger);

    // Select an icon
    const birdIcon = screen.getByRole("button", { name: /bird/i });
    await user.click(birdIcon);

    // Popover should close - search input should not be visible
    await waitFor(() => {
      expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    });

    // Trigger should show selected icon
    const updatedTrigger = screen.getByRole("button", { name: /bird/i });
    expect(updatedTrigger).toBeInTheDocument();
  });

  it("calls onValueChange when icon is selected", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithProviders(
      <IconPicker icons={mockIcons} onValueChange={handleValueChange} />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const birdIcon = screen.getByRole("button", { name: /bird/i });
    await user.click(birdIcon);

    expect(handleValueChange).toHaveBeenCalledWith("bird");
  });

  it("works as controlled component with value prop", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithProviders(
      <IconPicker
        icons={mockIcons}
        value="cat"
        onValueChange={handleValueChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: /cat/i });
    expect(trigger).toBeInTheDocument();

    // Open and select different icon
    await user.click(trigger);
    const birdIcon = screen.getByRole("button", { name: /bird/i });
    await user.click(birdIcon);

    // Should call onValueChange but trigger should still show controlled value
    expect(handleValueChange).toHaveBeenCalledWith("bird");
  });

  it("supports custom trigger children", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <IconPicker icons={mockIcons}>
        <button>Custom Trigger</button>
      </IconPicker>,
    );

    const customTrigger = screen.getByRole("button", {
      name: "Custom Trigger",
    });
    expect(customTrigger).toBeInTheDocument();

    // Should still open popover when clicked
    await user.click(customTrigger);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
  });
});
