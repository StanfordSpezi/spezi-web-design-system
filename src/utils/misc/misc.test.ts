//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isEmpty, isObject, joinPaths, not, times, upperFirst } from "./misc";

describe("not", () => {
  it("negates value", () => {
    expect(not(true)).toBe(false);
    expect(not(false)).toBe(true);
    expect(not("")).toBe(true);
    expect(not(5)).toBe(false);
  });
});

describe("upperFirst", () => {
  it("makes first letter of string uppercased", () => {
    expect(upperFirst("lorem")).toBe("Lorem");
    expect(upperFirst("LOREM")).toBe("LOREM");
    expect(upperFirst("loReM")).toBe("LoReM");
    expect(upperFirst("lorem ipsum")).toBe("Lorem ipsum");
    expect(upperFirst("lorem IPSUM")).toBe("Lorem IPSUM");
    expect(upperFirst("")).toBe("");
    expect(upperFirst("l")).toBe("L");
  });
});

describe("times", () => {
  it("generates array with provided length", () => {
    expect(times(3, () => null)).toEqual([null, null, null]);
  });

  it("gets index as argument", () => {
    expect(times(2, (index) => index)).toEqual([0, 1]);
  });
});

describe("isObject", () => {
  it.each([
    [null, false],
    [{}, true],
    [false, false],
    [Object.create(null), true],
    [() => ({ noop: true }), false],
  ])("checks if %s is object -> %s", (a, result) => {
    expect(isObject(a)).toEqual(result);
  });
});

describe("isEmpty", () => {
  it.each([
    [null, true],
    [undefined, true],
    [{}, true],
    [{ a: 5 }, false],
    [false, false],
    [true, false],
    ["", true],
    ["some", false],
    ["", true],
    [new Set(["one"]), false],
    [new Set(), true],
  ])("checks if %s is empty -> %s", (a, result) => {
    expect(isEmpty(a)).toEqual(result);
  });
});

describe("joinPaths", () => {
  it("joins basic segments", () => {
    expect(joinPaths("/api/v1/", "/users", "123")).toBe("/api/v1/users/123");
  });

  it("collapses duplicate slashes between segments", () => {
    expect(joinPaths("/api//", "//v1///", "users")).toBe("/api/v1/users");
  });

  it("preserves absolute URL bases", () => {
    expect(joinPaths("https://example.com/", "/users/", "123")).toBe(
      "https://example.com/users/123",
    );
  });

  it("keeps query and hash on the last segment", () => {
    expect(joinPaths("/api", "users?x=1#top")).toBe("/api/users?x=1#top");
    expect(joinPaths("/api/", "users/?x=1#top")).toBe("/api/users/?x=1#top");
  });

  it("ignores null/undefined/empty segments", () => {
    expect(joinPaths(undefined, "", "/a/", null, "b")).toBe("/a/b");
  });

  it("supports numeric segments", () => {
    expect(joinPaths("/users", 42)).toBe("/users/42");
  });

  it("returns empty string when all segments are empty", () => {
    expect(joinPaths("", null, undefined, "")).toBe("");
  });
});
