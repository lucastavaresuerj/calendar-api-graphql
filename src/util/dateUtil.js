export default class DateUtil {
  // One day = 86400000 miliseconds
  static dateDiffDay(dayAfter, dayBefore) {
    return (
      (new Date(dayAfter).setHours(0, 0, 0, 0) -
        new Date(dayBefore).setHours(0, 0, 0, 0)) /
      86400000
    );
  }

  static getDateDayString(date) {
    return date.toISOString().replace(/T.*/g, "T00:00");
  }

  static getDaysBetween(d1, d2) {
    let days = [];
    let numDays;
    if (typeof d2 === "number") {
      numDays = d2 - 1;
    } else {
      numDays = this.dateDiffDay(d2, d1);
    }

    const { year, month, date } = this.getDateAtt(d1);
    for (let i = 0; i <= numDays; i++) {
      days.push(new Date(year, month, date + i));
    }
    return days;
  }

  static getDateAtt(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds(),
      time: date.getTime(),
    };
  }
}
