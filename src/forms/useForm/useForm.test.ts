//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { renderHook, act } from "@testing-library/react";
import { z } from "zod";
import { useForm } from "./useForm";

describe("useForm", () => {
  it("exposes formError value and setFormError utility", async () => {
    const { result } = renderHook(() => useForm({ formSchema: z.object({}) }));

    expect(result.current.formError).toBe(undefined);

    act(() => {
      result.current.setFormError(new Error("Error message"));
    });
    expect(result.current.formError).toMatchObject({
      message: "Error message",
    });

    act(() => {
      result.current.setFormError("Unknown");
    });
    expect(result.current.formError).toMatchObject({ message: "Unknown" });

    act(() => {
      result.current.setFormError({ a: 1 });
    });
    expect(result.current.formError).toMatchObject({
      message: "Unknown error happened",
    });

    await act(async () => {
      await result.current.handleSubmit(() => {
        // positive form submit resets errors
      })();
    });
    expect(result.current.formError).toBe(undefined);
  });

  it("exposes submitAsync utility", async () => {
    const { result } = renderHook(() =>
      useForm({
        formSchema: z.object({
          value: z.string(),
        }),
      }),
    );

    // submitAsync should throw, because no data is provided initially
    // therefore `value` is undefined
    await expect(() => result.current.submitAsync()).rejects.toThrow();

    act(() => {
      result.current.setValue("value", "some");
    });
    const data = await result.current.submitAsync();
    expect(data).toEqual({ value: "some" });
  });
});
