//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { getOrdinalSuffix } from "./getOrdinalSuffix";

describe("getOrdinalSuffix", () => {
  it("returns 'st' for 1", () => {
    expect(getOrdinalSuffix(1)).toBe("st");
  });

  it("returns 'nd' for 2", () => {
    expect(getOrdinalSuffix(2)).toBe("nd");
  });

  it("returns 'rd' for 3", () => {
    expect(getOrdinalSuffix(3)).toBe("rd");
  });

  it("returns 'th' for 4 through 10", () => {
    for (let i = 4; i <= 10; i++) {
      expect(getOrdinalSuffix(i)).toBe("th");
    }
  });

  it("returns 'th' for 11, 12, and 13 (special cases)", () => {
    expect(getOrdinalSuffix(11)).toBe("th");
    expect(getOrdinalSuffix(12)).toBe("th");
    expect(getOrdinalSuffix(13)).toBe("th");
  });

  it("returns correct suffix for 21, 22, 23", () => {
    expect(getOrdinalSuffix(21)).toBe("st");
    expect(getOrdinalSuffix(22)).toBe("nd");
    expect(getOrdinalSuffix(23)).toBe("rd");
  });

  it("returns 'th' for 111, 112, and 113", () => {
    expect(getOrdinalSuffix(111)).toBe("th");
    expect(getOrdinalSuffix(112)).toBe("th");
    expect(getOrdinalSuffix(113)).toBe("th");
  });

  it("returns correct suffix for larger numbers", () => {
    expect(getOrdinalSuffix(101)).toBe("st");
    expect(getOrdinalSuffix(102)).toBe("nd");
    expect(getOrdinalSuffix(103)).toBe("rd");
    expect(getOrdinalSuffix(104)).toBe("th");
  });

  it("returns 'th' for 0", () => {
    expect(getOrdinalSuffix(0)).toBe("th");
  });
});
