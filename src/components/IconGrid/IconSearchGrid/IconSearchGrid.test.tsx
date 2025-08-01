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
import { type IconData } from "../IconGrid";
import { IconSearchGrid } from "./IconSearchGrid";

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

describe("IconSearchGrid", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      value: 800,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      value: 800,
    });
  });

  it("renders search input", () => {
    renderWithQueryClient(<IconSearchGrid icons={mockIcons} />);

    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders search input with custom placeholder", () => {
    renderWithQueryClient(
      <IconSearchGrid
        icons={mockIcons}
        searchPlaceholder="Find your icon..."
      />,
    );

    const searchInput = screen.getByPlaceholderText("Find your icon...");
    expect(searchInput).toBeInTheDocument();
  });

  it("debounces search input and filters icons", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<IconSearchGrid icons={mockIcons} />);

    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "bird");

    // Initially all icons should be visible (before debounce)
    expect(screen.getByRole("button", { name: /bird/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cat/i })).toBeInTheDocument();

    // Wait for debounce and filtering
    await waitFor(
      () => {
        expect(
          screen.queryByRole("button", { name: /cat/i }),
        ).not.toBeInTheDocument();
      },
      { timeout: 300 },
    );

    expect(screen.getByRole("button", { name: /bird/i })).toBeInTheDocument();
  });

  it("clears search results when input is cleared", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<IconSearchGrid icons={mockIcons} />);

    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "bird");

    await waitFor(
      () => {
        expect(
          screen.queryByRole("button", { name: /cat/i }),
        ).not.toBeInTheDocument();
      },
      { timeout: 300 },
    );

    await user.clear(searchInput);

    // Wait for debounce and expect all icons to be visible again
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /cat/i }),
        ).toBeInTheDocument();
      },
      { timeout: 300 },
    );
    expect(screen.getByRole("button", { name: /bird/i })).toBeInTheDocument();
  });
});
