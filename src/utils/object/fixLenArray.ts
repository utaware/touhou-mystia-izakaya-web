export class FixLengthArray<T = string> extends Array {

  max: number;

  constructor (max: number, value: Array<T> = []) {
    super()
    this.max = max
    this.init(value)
  }

  add (item: T) {
    if (this.length < this.max) {
      this.push(item)
    }
  }

  remove (index: number) {
    this.splice(index, 1)
  }

  init (value: Array<T>) {
    value.forEach(v => this.add(v))
  }

}