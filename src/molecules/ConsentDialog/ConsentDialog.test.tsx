//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { DialogHeader, DialogTitle } from "@/components/Dialog";
import {
  ConsentDialog,
  ConsentDialogCheckbox,
  ConsentDialogContent,
  ConsentDialogSubmit,
} from ".";

describe("ConsentDialog", () => {
  it("renders dialog with all components", () => {
    const onSubmit = vitest.fn();
    render(
      <ConsentDialog open={true}>
        <ConsentDialogContent>
          <p>Test content</p>
        </ConsentDialogContent>
        <ConsentDialogCheckbox label="Test checkbox" />
        <ConsentDialogSubmit onClick={onSubmit}>Submit</ConsentDialogSubmit>
      </ConsentDialog>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(screen.getByText("Test checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("disables submit button until checkbox is checked", () => {
    const onSubmit = vitest.fn();
    render(
      <ConsentDialog open={true}>
        <DialogHeader>
          <DialogTitle>Test</DialogTitle>
        </DialogHeader>
        <ConsentDialogCheckbox label="Test checkbox" />
        <ConsentDialogSubmit onClick={onSubmit}>Submit</ConsentDialogSubmit>
      </ConsentDialog>,
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalled();
  });

  it("prevents dialog from closing", () => {
    render(
      <ConsentDialog open={true}>
        <DialogHeader>
          <DialogTitle>Test</DialogTitle>
        </DialogHeader>
        <ConsentDialogCheckbox label="Test checkbox" />
        <ConsentDialogSubmit>Submit</ConsentDialogSubmit>
      </ConsentDialog>,
    );

    // Try to close the dialog by clicking outside
    const backdrop = screen.getByTestId("dialogOverlay");
    fireEvent.click(backdrop);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
