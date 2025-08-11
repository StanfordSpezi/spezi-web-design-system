//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/tests/helpers";
import { IconGrid, type IconData } from "./IconGrid";

const mockIcons: IconData[] = [
  { name: "bird", categories: [], tags: [] },
  { name: "cat", categories: [], tags: [] },
  { name: "dog", categories: [], tags: [] },
  { name: "rabbit", categories: [], tags: [] },
  { name: "rat", categories: [], tags: [] },
];

describe("IconGrid", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      value: 800,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      value: 800,
    });
  });

  it("renders icon buttons with custom icons", () => {
    renderWithProviders(<IconGrid icons={mockIcons} />);

    mockIcons.forEach((icon) => {
      const button = screen.getByRole("button", {
        name: new RegExp(icon.name, "i"),
      });
      expect(button).toBeInTheDocument();
    });
  });

  it("renders custom grid dimensions", () => {
    renderWithProviders(
      <IconGrid icons={mockIcons} columns={4} visibleRows={3} rowHeight={48} />,
    );

    // All icons should still be rendered
    mockIcons.forEach((icon) => {
      const button = screen.getByRole("button", {
        name: new RegExp(icon.name, "i"),
      });
      expect(button).toBeInTheDocument();
    });
  });

  it("filters icons based on search term", async () => {
    renderWithProviders(<IconGrid icons={mockIcons} searchTerm="bird" />);

    const birdButton = await screen.findByRole("button", { name: /bird/i });
    expect(birdButton).toBeInTheDocument();

    // Other icons should not be visible
    expect(
      screen.queryByRole("button", { name: /cat/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /dog/i }),
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no icons match search", () => {
    renderWithProviders(
      <IconGrid icons={mockIcons} searchTerm="nonexistent" />,
    );

    const emptyState = screen.getByText(/No icon found/i);
    expect(emptyState).toBeInTheDocument();
  });

  it("calls onValueChange when icon is clicked", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithProviders(
      <IconGrid icons={mockIcons} onValueChange={handleValueChange} />,
    );

    const birdButton = screen.getByRole("button", { name: /bird/i });
    await user.click(birdButton);

    expect(handleValueChange).toHaveBeenCalledWith("bird");
  });

  it("shows loading skeleton when data is loading", () => {
    // Mock the import to simulate loading state
    vi.doMock("../IconPicker/iconsData", () => ({
      iconsData: mockIcons,
    }));

    renderWithProviders(<IconGrid />);

    const skeletons = screen.getByTestId("icon-grid-skeleton");
    expect(skeletons).toBeInTheDocument();
  });

  it("loads icon data from query when no custom icons provided", async () => {
    vi.doMock("../IconPicker/iconsData", () => ({
      iconsData: mockIcons,
    }));

    renderWithProviders(<IconGrid />);

    const birdButton = await screen.findByRole("button", { name: /bird/i });
    expect(birdButton).toBeInTheDocument();
  });

  it("shows tooltips on hover when enabled", async () => {
    const user = userEvent.setup();

    renderWithProviders(<IconGrid icons={mockIcons} showTooltip={true} />);

    const birdButton = screen.getByTestId(`icon-renderer-bird`);
    fireEvent.mouseOver(birdButton);

    const tooltipTrigger = screen.getByTestId(`icon-tooltip-trigger-bird`);
    expect(tooltipTrigger).toBeInTheDocument();

    await user.hover(tooltipTrigger);

    const tooltip = await screen.findByTestId("icon-tooltip");
    expect(tooltip).toHaveTextContent("Bird");
  });

  it("does not show tooltips when disabled", () => {
    renderWithProviders(<IconGrid icons={mockIcons} showTooltip={false} />);

    const birdButton = screen.getByTestId(`icon-renderer-bird`);
    fireEvent.mouseOver(birdButton);

    expect(
      screen.queryByTestId(`icon-tooltip-trigger-bird`),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-tooltip")).not.toBeInTheDocument();
  });
});
