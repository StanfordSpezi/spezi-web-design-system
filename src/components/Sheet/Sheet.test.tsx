//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from ".";

describe("Sheet", () => {
  it("renders accessible sheet", () => {
    render(
      <Sheet>
        <SheetTrigger>Trigger</SheetTrigger>
        <SheetContent>
          <SheetTitle>Content</SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    const querySheetContent = () => screen.queryByText("Content");

    expect(querySheetContent()).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Trigger" });
    fireEvent.click(trigger);

    expect(querySheetContent()).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(querySheetContent()).not.toBeInTheDocument();
  });
});
