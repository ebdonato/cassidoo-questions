/**
 * Checks if a given year is a leap year in the Gregorian calendar.
 * @param {number} year - The year to check
 * @returns {boolean} True if the year is a leap year, false otherwise
 */
function isLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Checks if a given year has a perfect February.
 * @param {number} year - The year to check
 * @param {number} weekStartDay - 0 for Sunday (Default), 1 for Monday
 * @returns {boolean} True if the year has a perfect February, false otherwise
 */
function isFebPerfect(year: number, weekStartDay: number): boolean {
  if (isLeap(year)) return false;

  const febFirst = new Date(year, 1, 1);
  return febFirst.getDay() === weekStartDay;
}

enum Direction {
  Forward,
  Backward,
}

/**
 * Finds the closest previous or next perfect month around the given Gregorian year.
 * @param {number} startYear  - The Gregorian year to find the nearest perfect month around
 * @param {Direction} direction - The direction to search (if true search forward, if false backward)
 * @param {number} weekStartDay - 0 for Sunday (Default), 1 for Monday
 * @returns The closest previous or next perfect month
 * @example
 * nearestPerfectMonth(2025) // "2021-02"
 * nearestPerfectMonth(2026) // "2026-02"
 */
function find(
  startYear: number,
  direction: Direction,
  weekStartDay: number = 0,
): number {
  let targetYear = 0;
  let currentSearch = startYear;

  const moveFn =
    direction === Direction.Forward
      ? (year: number) => ++year
      : (year: number) => --year;

  while (!targetYear) {
    currentSearch = moveFn(currentSearch);
    if (isFebPerfect(currentSearch, weekStartDay)) {
      targetYear = currentSearch;
    }
  }

  return targetYear;
}

/**
 * Finds the closest previous and next perfect months around the given Gregorian year.
 * A perfect month designates a month whose number of days is divisible
 * by the number of days in a week and whose first day corresponds to the first day of the week.
 * @param {number} startYear  - The Gregorian year to find the nearest perfect months around
 * @param {number} weekStartDay - 0 for Sunday (Default), 1 for Monday
 * @returns An object with the closest previous and next perfect months
 * @example
 * nearestPerfectMonths(2025) // { prev: "2021-02", next: "2026-02" }
 * nearestPerfectMonths(2026) // { prev: "2026-02", next: "2027-02" }
 */
export function nearestPerfectMonths(
  startYear: number,
  weekStartDay: number = 0,
): {
  prev: string;
  next: string;
} {
  // --- Search Backwards (Previous) ---
  const previousYear = find(startYear, Direction.Backward, weekStartDay);

  // --- Search Forwards (Next) ---
  const nextYear = find(startYear, Direction.Forward, weekStartDay);

  return {
    prev: `${previousYear}-02`,
    next: `${nextYear}-02`,
  };
}
