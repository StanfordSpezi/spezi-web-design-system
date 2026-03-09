//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createElement } from "react";
import { reactNodeToText } from "./react";

describe("reactNodeToText", () => {
  it("returns empty string for null", () => {
    expect(reactNodeToText(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(reactNodeToText(undefined)).toBe("");
  });

  it("returns empty string for false", () => {
    expect(reactNodeToText(false)).toBe("");
  });

  it("returns string as-is", () => {
    expect(reactNodeToText("Hello")).toBe("Hello");
  });

  it("converts number to string", () => {
    expect(reactNodeToText(42)).toBe("42");
  });

  it("converts zero to string", () => {
    expect(reactNodeToText(0)).toBe("0");
  });

  it("extracts text from React element children", () => {
    const element = createElement("div", null, "Hello World");
    expect(reactNodeToText(element)).toBe("Hello World");
  });

  it("extracts text from nested elements", () => {
    const element = createElement(
      "div",
      null,
      createElement("span", null, "Hello"),
      createElement("span", null, " World"),
    );
    expect(reactNodeToText(element)).toBe("Hello World");
  });

  it("concatenates text from arrays", () => {
    expect(reactNodeToText(["A", "B", "C"])).toBe("ABC");
  });

  it("returns empty string for element without children", () => {
    const element = createElement("br");
    expect(reactNodeToText(element)).toBe("");
  });
});
