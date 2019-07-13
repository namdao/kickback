export class Common {
  static sleep = function* (time) {
    yield new Promise(resolve => setTimeout(resolve, time));
  }
}