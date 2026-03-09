//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  formatDate,
  formatDateTime,
  formatDateRange,
  formatNilDate,
  formatNilDateTime,
  formatNilDateRange,
} from "./date";

describe("formatDate", () => {
  it("formats a Date object", () => {
    const date = new Date(2025, 0, 15);
    expect(formatDate(date)).toBe(date.toLocaleDateString());
  });

  it("formats a date string", () => {
    const result = formatDate("2025-06-15");
    const expected = new Date("2025-06-15").toLocaleDateString();
    expect(result).toBe(expected);
  });

  it("formats a timestamp number", () => {
    const date = new Date(2025, 5, 15);
    expect(formatDate(date.getTime())).toBe(date.toLocaleDateString());
  });
});

describe("formatNilDate", () => {
  it("returns null for null", () => {
    expect(formatNilDate(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(formatNilDate(undefined)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(formatNilDate("")).toBeNull();
  });

  it("formats valid date input", () => {
    const date = new Date(2025, 0, 15);
    expect(formatNilDate(date)).toBe(date.toLocaleDateString());
  });
});

describe("formatDateTime", () => {
  it("formats date with time", () => {
    const date = new Date(2025, 0, 15, 14, 30);
    const result = formatDateTime(date);
    expect(result).toContain(date.toLocaleDateString());
    const expectedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(result).toContain(expectedTime);
  });

  it("formats a date string", () => {
    const result = formatDateTime("2025-06-15T10:00:00");
    expect(result).toContain(
      new Date("2025-06-15T10:00:00").toLocaleDateString(),
    );
  });
});

describe("formatNilDateTime", () => {
  it("returns null for null", () => {
    expect(formatNilDateTime(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(formatNilDateTime(undefined)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(formatNilDateTime("")).toBeNull();
  });

  it("formats valid date input with time", () => {
    const date = new Date(2025, 0, 15, 14, 30);
    const result = formatNilDateTime(date);
    expect(result).not.toBeNull();
    expect(result).toContain(date.toLocaleDateString());
  });
});

describe("formatDateRange", () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  it("formats a range with both start and end", () => {
    const start = "2025-01-01";
    const end = "2025-01-31";
    const expected = formatter.formatRange(new Date(start), new Date(end));
    expect(formatDateRange({ start, end }, formatter)).toBe(expected);
  });

  it("formats a range with only start", () => {
    const start = "2025-01-01";
    const expected = `from ${formatter.format(new Date(start))}`;
    expect(formatDateRange({ start }, formatter)).toBe(expected);
  });

  it("formats a range with only end", () => {
    const end = "2025-01-31";
    const expected = `ending ${formatter.format(new Date(end))}`;
    expect(formatDateRange({ end }, formatter)).toBe(expected);
  });

  it("returns null if no dates are provided", () => {
    expect(formatDateRange({}, formatter)).toBeNull();
  });

  it("works with Date objects and numbers", () => {
    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 0, 31);
    const expected = formatter.formatRange(start, end);
    expect(formatDateRange({ start, end }, formatter)).toBe(expected);

    const startTimestamp = +start;
    const endTimestamp = +end;
    expect(
      formatDateRange({ start: startTimestamp, end: endTimestamp }, formatter),
    ).toBe(expected);
  });
});

describe("formatNilDateRange", () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  it("returns null for null input", () => {
    expect(formatNilDateRange(null, formatter)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(formatNilDateRange(undefined, formatter)).toBeNull();
  });

  it("returns null for empty object", () => {
    expect(formatNilDateRange({}, formatter)).toBeNull();
  });

  it("delegates to formatDateRange for valid input", () => {
    const start = "2025-01-01";
    const end = "2025-01-31";
    const expected = formatter.formatRange(new Date(start), new Date(end));
    expect(formatNilDateRange({ start, end }, formatter)).toBe(expected);
  });
});
