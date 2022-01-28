export default class DateUtil {
  // One day = 86400000 miliseconds
  static dateDiffDay(dayAfter, dayBefore) {
    return (
      (new Date(dayAfter).setHours(0, 0, 0, 0) -
        new Date(dayBefore).setHours(0, 0, 0, 0)) /
      86400000
    );
  }

  static getDaysBetween(begin, limit) {
    let days = [];
    let numDays;
    if (typeof limit === "number") {
      numDays = limit - 1;
    } else {
      numDays = this.dateDiffDay(limit, begin);
    }

    const { year, month, date } = this.getDateAtt(begin);
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
