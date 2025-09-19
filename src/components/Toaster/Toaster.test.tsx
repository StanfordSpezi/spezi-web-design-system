//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import * as sonner from "sonner";
import { Toaster, toast } from "./Toaster";

describe("Toaster", () => {
  it("shows toast when triggered", async () => {
    render(
      <>
        <Toaster />
        <button type="button" onClick={() => toast("Lorem")} />
      </>,
    );

    const toastHidden = screen.queryByText("Lorem");
    expect(toastHidden).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const toastVisible = await screen.findByText("Lorem");
    expect(toastVisible).toBeInTheDocument();
  });

  it("calls toast error with default duration 5000ms", () => {
    const spy = vi.spyOn(sonner.toast, "error");

    // When no duration provided, default to 5000
    toast.error("Lorem");
    expect(spy).toHaveBeenCalledTimes(1);
    const firstCall = spy.mock.calls[0];
    const firstOptions = firstCall[1];
    expect(firstOptions?.duration).toBe(5000);

    // When duration provided, it should override the default
    toast.error("Lorem", { duration: 3000 });
    expect(spy).toHaveBeenCalledTimes(2);
    const secondCall = spy.mock.calls[1];
    const secondOptions = secondCall[1];
    expect(secondOptions?.duration).toBe(3000);

    spy.mockRestore();
  });
});
