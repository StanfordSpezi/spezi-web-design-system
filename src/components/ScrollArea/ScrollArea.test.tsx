//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen, fireEvent } from "@testing-library/react";
import { ScrollArea, ScrollBar } from ".";

describe("ScrollArea", () => {
  it("renders scroll area with content", () => {
    render(
      <ScrollArea>
        <p>Test content</p>
      </ScrollArea>,
    );

    const content = screen.getByText("Test content");
    expect(content).toBeInTheDocument();
  });

  it("handles onScroll event", () => {
    const handleScroll = vi.fn();

    render(
      <ScrollArea onScroll={handleScroll} style={{ height: "100px" }}>
        <div style={{ height: "200px" }}>
          <p>Scrollable content</p>
        </div>
      </ScrollArea>,
    );

    const viewport = screen.getByTestId("scroll-area-viewport");
    fireEvent.scroll(viewport, { target: { scrollTop: 100 } });

    expect(handleScroll).toHaveBeenCalled();
  });

  it("does not render scrollbar when content fits", () => {
    render(
      <ScrollArea style={{ height: "100px" }}>
        <div style={{ height: "99px" }}>
          <p>Content fits within the scroll area</p>
        </div>
      </ScrollArea>,
    );

    const scrollbar = screen.queryByTestId("scroll-area-scrollbar");
    expect(scrollbar).not.toBeInTheDocument();
  });

  it("renders vertical scrollbar by default with type 'always'", () => {
    render(
      <ScrollArea type="always" style={{ height: "100px" }}>
        <div style={{ height: "200px" }}>
          <p>Scrollable content</p>
        </div>
      </ScrollArea>,
    );

    const scrollbar = screen.getByTestId("scroll-area-scrollbar");
    expect(scrollbar).toHaveAttribute("data-orientation", "vertical");
  });

  it("does not render scrollbar when type is not 'always'", () => {
    render(
      <ScrollArea type="auto" style={{ height: "100px" }}>
        <div style={{ height: "200px" }}>
          <p>Scrollable content</p>
        </div>
      </ScrollArea>,
    );

    const scrollbar = screen.queryByTestId("scroll-area-scrollbar");
    expect(scrollbar).not.toBeInTheDocument();
  });

  it("renders horizontal scrollbar when orientation is horizontal", () => {
    render(
      <ScrollArea type="always" style={{ width: "100px" }}>
        <div style={{ width: "200px" }}>
          <p>Scrollable content</p>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>,
    );

    const scrollbars = screen.getAllByTestId("scroll-area-scrollbar");
    expect(scrollbars).toHaveLength(2);
    expect(
      scrollbars.some(
        (sb) => sb.getAttribute("data-orientation") === "horizontal",
      ),
    ).toBe(true);
    expect(
      scrollbars.some(
        (sb) => sb.getAttribute("data-orientation") === "vertical",
      ),
    ).toBe(true);
  });
});
