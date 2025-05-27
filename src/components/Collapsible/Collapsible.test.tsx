//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen, fireEvent } from "@testing-library/react";
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";

describe("Collapsible", () => {
  it("renders collapsible content correctly", () => {
    render(
      <CollapsibleRoot>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Test Content</CollapsibleContent>
      </CollapsibleRoot>,
    );

    expect(screen.getByText("Toggle")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("toggles content visibility when trigger is clicked", () => {
    render(
      <CollapsibleRoot>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Test Content</CollapsibleContent>
      </CollapsibleRoot>,
    );

    const trigger = screen.getByText("Toggle");
    expect(trigger).toHaveAttribute("data-state", "closed");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });
});
