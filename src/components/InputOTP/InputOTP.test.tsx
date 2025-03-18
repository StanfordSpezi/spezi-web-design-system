//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { InputOTP } from ".";

describe("InputOTP", () => {
  it("renders otp input", () => {
    render(<InputOTP maxLength={6} />);

    const textBox = screen.getByRole("textbox", { hidden: true });
    expect(textBox).toBeInTheDocument();

    const value = "123";

    fireEvent.change(textBox, { target: { value } });

    value.split("").forEach((number) => {
      expect(screen.getByText(number)).toBeInTheDocument();
    });
  });
});
