//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "@/tests/helpers";
import { mockBreadcrumbs } from "./Breadcrumb.mocks";
import { Breadcrumbs } from ".";

describe("Breadcrumb", () => {
  it("renders links and active item", () => {
    renderWithProviders(
      <Breadcrumbs breadcrumbs={mockBreadcrumbs} maxToDisplay={999} />,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockBreadcrumbs.length);
    const home = screen.getByText("Home");
    expect(home).toHaveRole("link");

    const activePage = screen.getByText("Props");
    expect(activePage).toHaveRole("link");
    expect(activePage).toHaveAttribute("aria-current", "page");
  });

  it("truncates items within dropdown if there is too many", async () => {
    renderWithProviders(
      <Breadcrumbs breadcrumbs={mockBreadcrumbs} maxToDisplay={3} />,
    );

    const more = screen.getByText("More");
    expect(more).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    const visibleLabels = ["Home", "Full component", "Props"];
    visibleLabels.forEach((text) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
    });

    const invisibleLabels = ["Docs", "Components", "Breadcrumbs"];
    invisibleLabels.forEach((text) => {
      const link = screen.queryByText(text);
      expect(link).not.toBeInTheDocument();
    });

    await userEvent.click(more);

    invisibleLabels.forEach((name) => {
      const link = screen.getByRole("link", { name });
      expect(link).toBeInTheDocument();
    });
  });

  it("doesn't truncate if there are not enough items", () => {
    renderWithProviders(
      <Breadcrumbs
        breadcrumbs={mockBreadcrumbs.slice(0, 3)}
        maxToDisplay={3}
      />,
    );

    const more = screen.queryByText("More");
    expect(more).not.toBeInTheDocument();
  });
});
