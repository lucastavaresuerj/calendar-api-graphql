import jwt from "jsonwebtoken";

import { createToken } from "./token";

describe("Test the creation of tokens", () => {
  const matchToken = /^[\w-]*\.[\w-]*\.[\w-]*$/g;

  test("Should not create token from empty id", () => {
    expect(() => createToken()).toThrow();
    expect(() => createToken("")).toThrow();
  });

  test("Should not create token from id", () => {
    expect(createToken({ id: "87adf89145fc9112ca" })).toMatch(matchToken);
  });
});
