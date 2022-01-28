import { DateUtil } from ".";

const testInput = {
  couple: {
    sameDays: { first: new Date(), last: new Date() },
    oneDayDiff: {
      first: new Date(),
      last: new Date(new Date().setHours(new Date().getHours() + 24)),
    },
    fiveDaysDiff: {
      first: new Date(),
      last: new Date(new Date().setHours(new Date().getHours() + 24 * 5)),
    },
  },
  single: {
    datesInput: {
      date: new Date(),
      null: null,
      number: 1,
      dateString: new Date().toString(),
      localeString: new Date().toLocaleDateString(),
      timeMillisecounds: Date.now(),
      undefined: undefined,
      randonString: "a_randon_string",
    },
  },
};

describe("Test the static method of diff days", () => {
  test("Should give the number of days from the first day until the last day", () => {
    const { sameDays, oneDayDiff, fiveDaysDiff } = testInput.couple;

    expect(DateUtil.dateDiffDay(sameDays.last, sameDays.first)).toBe(0);
    expect(DateUtil.dateDiffDay(oneDayDiff.last, oneDayDiff.first)).toBe(1);
    expect(DateUtil.dateDiffDay(fiveDaysDiff.last, fiveDaysDiff.first)).toBe(5);

    expect(DateUtil.dateDiffDay(oneDayDiff.first, oneDayDiff.last)).toBe(-1);
    expect(DateUtil.dateDiffDay(fiveDaysDiff.first, fiveDaysDiff.last)).toBe(
      -5
    );
  });

  test("Should work only when the two arguments can be parsed to Date", () => {
    const { datesInput } = testInput.single;

    expect(DateUtil.dateDiffDay(datesInput.date, datesInput.date)).toBe(0);
    expect(DateUtil.dateDiffDay(datesInput.null, datesInput.null)).toBe(0);
    expect(DateUtil.dateDiffDay(datesInput.number, datesInput.number)).toBe(0);
    expect(
      DateUtil.dateDiffDay(datesInput.dateString, datesInput.dateString)
    ).toBe(0);
    expect(
      DateUtil.dateDiffDay(datesInput.localeString, datesInput.localeString)
    ).toBe(0);
    expect(
      DateUtil.dateDiffDay(
        datesInput.timeMillisecounds,
        datesInput.timeMillisecounds
      )
    ).toBe(0);

    expect(
      DateUtil.dateDiffDay(datesInput.undefined, datesInput.undefined)
    ).toBeNaN();
    expect(
      DateUtil.dateDiffDay(datesInput.randonString, datesInput.randonString)
    ).toBeNaN();
  });
});

describe("Test the creation of date arrays", () => {
  test("Should give an array of Date from two Dates", () => {});
});
