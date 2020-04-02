// @flow
import * as R from "ramda";

const isBracketMatch = (b1: string, b2: string): boolean => {
  const bsorted = [b1, b2].sort().join("");
  return bsorted === "{}" || bsorted === "()";
};

export const checkBrackets = (query: string) => {
  // Get only the brackets
  const queryBrackets = query.replace(/[^\{\}\(\)]/g, "");

  // Check that the first and last brackets are curly braces
  expect(queryBrackets.length).toBeGreaterThanOrEqual(2);
  const firstAndLastBrackets =
    queryBrackets[0] + queryBrackets[queryBrackets.length - 1];
  expect(firstAndLastBrackets).toBe("{}");

  let bracketsMatch = true;
  const bracketStack = [];
  for (const b of queryBrackets) {
    if ("{(".includes(b)) {
      bracketStack.push(b);
    } else if ("})".includes(b)) {
      if (!isBracketMatch(b, bracketStack.pop())) {
        bracketsMatch = false;
        break;
      }
    }
  }

  expect(bracketsMatch && R.isEmpty(bracketStack)).toBeTruthy();
};

export const checkVars = (query: string) => {
  const varMatches = query.match(/(\w+) as/g);
  if (!varMatches) {
    return;
  }

  const vars = varMatches.map(m => m.substring(0, m.length - 3));

  // If we see the variable more than once (to ignore the definition) then
  // we assume it's being used
  const usedVars = R.filter((v: string) => {
    const varRegex = new RegExp(v, "g");
    const vCount = (query.match(varRegex) || []).length;
    return vCount >= 2;
  }, vars);

  expect(usedVars).toStrictEqual(vars);
}
