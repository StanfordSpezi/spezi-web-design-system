//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { SaveButton } from "./SaveButton";

describe("SaveButton", () => {
  it("renders Save by default", () => {
    render(<SaveButton />);
    expect(screen.getByRole("button")).toHaveTextContent("Save");
  });

  it("shows Saved on success trigger", () => {
    const { rerender } = render(<SaveButton />);
    rerender(<SaveButton isSuccess />);
    expect(screen.getByRole("button")).toHaveTextContent("Saved");
  });

  it("shows Error on error trigger", () => {
    const { rerender } = render(<SaveButton />);
    rerender(<SaveButton isError />);
    expect(screen.getByRole("button")).toHaveTextContent("Error");
  });
});
