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
    let diffDays = this.dateDiffDay(d2, d1);
    for (let i = 0; i <= diffDays; i++) {
      let newDay = new Date(d1);
      newDay.setDate(d1.getDate() + i);
      days.push(newDay);
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
