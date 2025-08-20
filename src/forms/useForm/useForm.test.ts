//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { act, renderHook } from "@testing-library/react";
import { z } from "zod";
import * as z3 from "zod/v3";
import * as z4 from "zod/v4";
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

  describe("Zod v3 and v4 compatibility", () => {
    it("works with standard Zod v3 schemas", async () => {
      const schema = z3.object({
        email: z3.string().email(),
        age: z3.number().min(18),
        name: z3.string().min(1),
      });

      const { result } = renderHook(() =>
        useForm({
          formSchema: schema,
          defaultValues: {
            email: "",
            age: 0,
            name: "",
          },
        }),
      );

      act(() => {
        result.current.setValue("email", "invalid-email");
        result.current.setValue("age", 16);
        result.current.setValue("name", "");
      });

      await act(async () => {
        await expect(result.current.submitAsync()).rejects.toThrow();
      });

      // Test that valid data passes validation
      act(() => {
        result.current.setValue("email", "test@example.com");
        result.current.setValue("age", 25);
        result.current.setValue("name", "John Doe");
      });

      const data = await result.current.submitAsync();
      expect(data).toEqual({
        email: "test@example.com",
        age: 25,
        name: "John Doe",
      });
    });

    it("works with standard Zod v4 schemas", async () => {
      const schema = z4.object({
        email: z4.email(),
        age: z4.number().min(18),
        name: z4.string().min(1),
      });

      const { result } = renderHook(() =>
        useForm({
          formSchema: schema,
          defaultValues: {
            email: "",
            age: 0,
            name: "",
          },
        }),
      );

      act(() => {
        result.current.setValue("email", "invalid-email");
        result.current.setValue("age", 16);
        result.current.setValue("name", "");
      });

      await act(async () => {
        await expect(result.current.submitAsync()).rejects.toThrow();
      });

      // Test that valid data passes validation
      act(() => {
        result.current.setValue("email", "test@example.com");
        result.current.setValue("age", 25);
        result.current.setValue("name", "John Doe");
      });

      const data = await result.current.submitAsync();
      expect(data).toEqual({
        email: "test@example.com",
        age: 25,
        name: "John Doe",
      });
    });
  });
});
