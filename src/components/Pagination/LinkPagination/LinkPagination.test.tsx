//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/tests/helpers";
import { LinkPagination } from "./LinkPagination";

describe("LinkPagination", () => {
  const getHref = (page: number) => `/${page}`;

  it("renders two pages closest to active, ellipses, first and last page", () => {
    renderWithProviders(
      <LinkPagination total={20} page={10} getHref={getHref} />,
    );

    const pages = [
      { name: /prev/i, page: 9 }, // prev button,
      { name: "1", page: 1 }, // first
      { name: "9", page: 9 },
      { name: "10", page: 10 }, // active and 2 around active
      { name: "11", page: 11 },
      { name: "20", page: 20 }, // last
      { name: /next/i, page: 11 }, // next button,
    ];

    pages.forEach(({ name, page }) => {
      const pageLink = screen.getByRole("link", { name });
      expect(pageLink).toBeInTheDocument();
      expect(pageLink).toHaveAttribute("href", `/${page}`);
    });

    const ellipses = screen.getAllByText("More pages");
    expect(ellipses).toHaveLength(2);
  });

  it("doesnt render previous page button when at first page", () => {
    renderWithProviders(
      <LinkPagination total={2} page={1} getHref={getHref} />,
    );

    const prevButton = screen.queryByRole("link", { name: /prev/i });
    expect(prevButton).not.toBeInTheDocument();
  });

  it("doesnt render next page button when at last page", () => {
    renderWithProviders(
      <LinkPagination total={2} page={2} getHref={getHref} />,
    );

    const nextButton = screen.queryByRole("link", { name: /next/i });
    expect(nextButton).not.toBeInTheDocument();
  });

  it("renders more siblings when sibling prop passed", () => {
    renderWithProviders(
      <LinkPagination total={20} page={10} siblings={3} getHref={getHref} />,
    );

    const siblings = [7, 8, 9];

    siblings.forEach((sibling) => {
      const pageButton = screen.getByRole("link", { name: String(sibling) });
      expect(pageButton).toBeInTheDocument();
    });
  });
});
