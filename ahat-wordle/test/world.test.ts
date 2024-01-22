import { expect, test } from "vitest";
import { calculatePositions, getAvailableLetters } from "../src/engine/wordle";
import type { LetterState } from "../src/engine/wordle";

const STATE_MAP: Record<LetterState, number> = {
  correct: 0,
  "wrong-place": 1,
  wrong: 2,
};

function positionsToValues(
  positions: {
    letter: string;
    state: LetterState;
    index: number;
  }[]
) {
  return positions.map((p) => STATE_MAP[p.state]);
}

test("should return correct letters", () => {
  expect(positionsToValues(calculatePositions("hello", "hello"))).toEqual([
    0, 0, 0, 0, 0,
  ]);
  expect(calculatePositions("hello", "hello")).toEqual([
    {
      letter: "h",
      state: "correct",
      index: 0,
    },
    {
      letter: "e",
      state: "correct",
      index: 1,
    },
    {
      letter: "l",
      state: "correct",
      index: 2,
    },
    {
      letter: "l",
      state: "correct",
      index: 3,
    },
    {
      letter: "o",
      state: "correct",
      index: 4,
    },
  ]);
});

test("should find wrong places", () => {
  expect(positionsToValues(calculatePositions("hello", "ehllo"))).toEqual([
    1, 1, 0, 0, 0,
  ]);
});

test("should find wrong letters", () => {
  expect(positionsToValues(calculatePositions("hello", "ehzzt"))).toEqual([
    1, 1, 2, 2, 2,
  ]);
});

test("should account for doubles", () => {
  expect(positionsToValues(calculatePositions("Hello", "hELZl"))).toEqual([
    0, 0, 0, 2, 1,
  ]);
  expect(positionsToValues(calculatePositions("hello", "raise"))).toEqual([
    2, 2, 2, 2, 1,
  ]);
  expect(positionsToValues(calculatePositions("hello", "lelho"))).toEqual([
    1, 0, 0, 1, 0,
  ]);
});

test("should find available letters", () => {
  expect(getAvailableLetters(["hello"])).toEqual(
    "abcdfgijkmnpqrstuvwxyz".split("")
  );
});
