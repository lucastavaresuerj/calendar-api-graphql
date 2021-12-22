export default class BlackList {
  constructor(list = []) {
    this.blackList = list;
  }

  clear() {
    this.blackList = [];
  }

  add(item, delay = 1000 * 60 * 24) {
    this.blackList.push(item);
    setTimeout(() => {
      const index = this.blackList.indexOf(item);
      this.blackList.splice(index, 1);
    }, delay);
  }

  has(item) {
    return this.blackList.indexOf(item) > -1;
  }
}
