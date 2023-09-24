import { run } from "./app";

test("sort", () => {
  const result = run;
  const arrExpect = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(result).toBeWithinRange(arrExpect);
});
