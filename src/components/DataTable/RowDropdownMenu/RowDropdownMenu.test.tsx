//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { RowDropdownMenu } from ".";

describe("RowDropdownMenu", () => {
  it("shows accessible actions menu for table row", () => {
    render(<RowDropdownMenu itemName="Example">Lorem</RowDropdownMenu>);

    const button = screen.getByRole("button", {
      name: "Open actions for Example",
    });
    expect(button).toBeInTheDocument();
  });
});
