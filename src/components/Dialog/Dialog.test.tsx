//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";

describe("Dialog", () => {
  it("renders accessible dialog", () => {
    render(
      <Dialog>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogContent>
          <DialogTitle>Content</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    const queryContent = () => screen.queryByText("Content");

    expect(queryContent()).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Trigger" });
    fireEvent.click(trigger);

    expect(queryContent()).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(queryContent()).not.toBeInTheDocument();
  });
});
