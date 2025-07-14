import { formatDateRange, formatNilDateRange } from "./date";

describe("formatDateRange", () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
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
    month: "short",
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
