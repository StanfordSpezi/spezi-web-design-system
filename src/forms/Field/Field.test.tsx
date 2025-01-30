//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { z } from "zod";
import { useForm } from "../useForm";
import { Field, type FieldProps } from ".";

const Component = (props: Partial<FieldProps<{ name: string }, "name">>) => {
  const form = useForm({
    formSchema: z.object({ name: z.string().min(10, "Name is too short") }),
  });

  return (
    <>
      <Field
        control={form.control}
        name="name"
        render={({ field }) => <input type="text" {...field} />}
        {...props}
      />
      <button
        type="button"
        onClick={form.handleSubmit(() => {
          // just to trigger validation
        })}
      >
        Submit
      </button>
    </>
  );
};

describe("Field", () => {
  it("renders accessible label", () => {
    render(<Component label="Label" />);

    const input = screen.getByLabelText("Label");
    expect(input.tagName).toBe("INPUT");
  });

  it("renders accessible error", async () => {
    const user = userEvent.setup();
    render(<Component />);

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");
    await user.type(input, "short");
    await user.click(submitButton);

    expect(input).toHaveAccessibleErrorMessage("Name is too short");

    await user.type(input, "nottooshort");

    expect(input).not.toHaveAccessibleErrorMessage("Name is too short");
  });

  it("renders custom error message", () => {
    render(<Component error={{ message: "Custom error" }} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAccessibleErrorMessage("Custom error");
  });

  it("renders accessible tooltip", async () => {
    const user = userEvent.setup();
    render(<Component tooltip="Tooltip content" />);

    const tooltipTrigger = screen.getByLabelText(
      "More information about the name field",
    );

    expect(tooltipTrigger).not.toHaveAccessibleDescription("Tooltip content");
    await user.hover(tooltipTrigger);
    expect(tooltipTrigger).toHaveAccessibleDescription("Tooltip content");
  });
});
