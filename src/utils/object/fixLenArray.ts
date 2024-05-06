export class FixLengthArray<T> extends Array {

  max: number;

  constructor (max: number) {
    super()
    this.max = max
  }

  add (item: T) {
    if (this.length < this.max) {
      this.push(item)
    }
  }

  remove (index: number) {
    this.splice(index, 1)
  }

}