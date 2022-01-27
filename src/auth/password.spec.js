import { checkPassword, createHashPassword } from "./password";

describe("Generate Hash passwords", () => {
  const matchString = /\$2b\$\d{2}\$[A-z0-9./]{53}/g; // Something like: $2b$04$LZsRL3tXG3SpHMh5keibAeTVmstRduGqwvPNCrOwAfEU2mKrmfL.S

  test("Should generate from empty strings", () => {
    expect(createHashPassword("")).toMatch(matchString);
  });

  test("Should generate from without arguments", () => {
    expect(createHashPassword()).toMatch(matchString);
  });

  test("Should generate from only numbers", () => {
    expect(createHashPassword("123456789")).toMatch(matchString);
  });

  test("Should generate from random characters", () => {
    expect(createHashPassword("M)w_cqIc.H")).toMatch(matchString);
  });
});

describe("Check Hashed passwords", () => {
  test("Should pass when password and encripted password are given corretly", () => {
    expect(
      checkPassword(
        "123456789",
        "$2b$04$Pt4t2G9ZfkjIUzlj6.ogCe1eGZuaVpeSzf37OnxnavHjB/xiTpnRG"
      )
    ).toBeTruthy();

    expect(
      checkPassword(
        "M)w_cqIc.H",
        "$2b$04$.hfSj60Rq/2Ucd2y8Hnrb.z85uLuDOLmGBdbzsp/MaEwgj7MhKvpG"
      )
    ).toBeTruthy();
  });

  test("Should not pass when password and encripted password are given incorretly", () => {
    expect(
      checkPassword(
        "123456788",
        "$2b$04$Pt4t2G9ZfkjIUzlj6.ogCe1eGZuaVpeSzf37OnxnavHjB/xiTpnRG"
      )
    ).toBeFalsy();

    expect(
      checkPassword(
        "M)w_cqIc.T",
        "$2b$04$.hfSj60Rq/2Ucd2y8Hnrb.z85uLuDOLmGBdbzsp/MaEwgj7MhKvpG"
      )
    ).toBeFalsy();
  });

  test("Should not pass when password are not given", () => {
    expect(
      checkPassword(
        "$2b$04$Pt4t2G9ZfkjIUzlj6.ogCe1eGZuaVpeSzf37OnxnavHjB/xiTpnRG"
      )
    ).toBeFalsy();
  });

  test("Should not pass when encripted password are not given", () => {
    expect(checkPassword("123456789")).toBeFalsy();
  });

  test("Should not pass when both password and encripted password are not given", () => {
    expect(checkPassword()).toBeFalsy();
  });
});

describe("Check passwords generated from create hash passwords", () => {
  test("Should pass when the same password is give to check and createHash functions", () => {
    const password = "1pGt9vm.H6";

    expect(checkPassword(password, createHashPassword(password))).toBeTruthy();
  });

  test("Should not pass when the password is different when check and createHash functions", () => {
    const password1 = "1pGt9vm.H6";
    const password2 = "aPj7.fgYmm";

    expect(checkPassword(password1, createHashPassword(password2))).toBeFalsy();
  });
});
