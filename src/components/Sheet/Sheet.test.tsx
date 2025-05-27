//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen, within } from "@testing-library/react";
import { Button } from "@/components/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from ".";

describe("Sheet", () => {
  it("renders accessible sheet", () => {
    render(
      <Sheet>
        <SheetTrigger>Trigger</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Content</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button>Submit</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    const querySheetContent = () => screen.queryByText("Content");

    expect(querySheetContent()).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Trigger" });
    fireEvent.click(trigger);

    expect(querySheetContent()).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName("Content");
    expect(dialog).toHaveAccessibleDescription("Description");
    expect(
      within(dialog).getByRole("button", { name: "Submit" }),
    ).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(querySheetContent()).not.toBeInTheDocument();
  });
});
