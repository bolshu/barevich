export default class Person {
  name: string
  age: number

  constructor (name: string, age: number) {
    this.name = name
    this.age = age
  };

  getData (): string {
    return `This is ${this.name}, ${this.age} years old`
  }

  printData (): void {
    console.log(this.getData())
  }
}
