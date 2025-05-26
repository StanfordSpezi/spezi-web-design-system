//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen, fireEvent } from "@testing-library/react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

describe("Accordion", () => {
  it("renders accordion content correctly", () => {
    render(
      <AccordionRoot type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("toggles content visibility when trigger is clicked", () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger = screen.getByText("Section 1");

    // Content should be hidden by default
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Click trigger to show content
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Click trigger again to hide content
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports multiple items with type 'single'", () => {
    render(
      <AccordionRoot type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger1 = screen.getByText("Section 1");
    const trigger2 = screen.getByText("Section 2");

    // Open first section
    fireEvent.click(trigger1);
    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "false");

    // Open second section (should close first)
    fireEvent.click(trigger2);
    expect(trigger1).toHaveAttribute("aria-expanded", "false");
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
  });

  it("supports multiple items with type 'multiple'", () => {
    render(
      <AccordionRoot type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger1 = screen.getByText("Section 1");
    const trigger2 = screen.getByText("Section 2");

    // Open first section
    fireEvent.click(trigger1);
    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "false");

    // Open second section (should keep first open)
    fireEvent.click(trigger2);
    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(trigger2).toHaveAttribute("aria-expanded", "true");
  });
});
