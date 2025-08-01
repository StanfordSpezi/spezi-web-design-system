//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactElement } from "react";
import { IconGrid, type IconData } from "./IconGrid";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const mockIcons: IconData[] = [
  { name: "bird", categories: [], tags: [] },
  { name: "cat", categories: [], tags: [] },
  { name: "dog", categories: [], tags: [] },
  { name: "rabbit", categories: [], tags: [] },
  { name: "rat", categories: [], tags: [] },
];

const renderWithQueryClient = (children: ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
};

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
    renderWithQueryClient(<IconGrid icons={mockIcons} />);

    mockIcons.forEach((icon) => {
      const button = screen.getByRole("button", {
        name: new RegExp(icon.name),
      });
      expect(button).toBeInTheDocument();
    });
  });

  it("filters icons based on search term", async () => {
    renderWithQueryClient(<IconGrid icons={mockIcons} searchTerm="bird" />);

    await waitFor(() => {
      const birdButton = screen.getByRole("button", { name: /bird/i });
      expect(birdButton).toBeInTheDocument();
    });

    // Other icons should not be visible
    expect(
      screen.queryByRole("button", { name: /cat/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /dog/i }),
    ).not.toBeInTheDocument();
  });

  it("shows empty state when no icons match search", () => {
    renderWithQueryClient(
      <IconGrid icons={mockIcons} searchTerm="nonexistent" />,
    );

    const emptyState = screen.getByText(/No icon found/i);
    expect(emptyState).toBeInTheDocument();
  });

  it("calls onValueChange when icon is clicked", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    renderWithQueryClient(
      <IconGrid icons={mockIcons} onValueChange={handleValueChange} />,
    );

    const birdButton = screen.getByRole("button", { name: /bird/i });
    await user.click(birdButton);

    expect(handleValueChange).toHaveBeenCalledWith("bird");
  });
});
