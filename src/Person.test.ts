import Person from './Person'

const NAME = 'Mike'
const AGE = 32
const DATA = `This is ${NAME}, ${AGE} years old`

describe('Test Person class', () => {
  let person: Person

  beforeEach(() => {
    person = new Person(NAME, AGE)
  })

  it('Should init with params in constructor', () => {
    expect(person.name).toBe(NAME)
    expect(person.age).toBe(AGE)
  })

  it('Should return person data', () => {
    expect(person.getData()).toBe(DATA)
  })

  it('Should be print person data', () => {
    const spyGetData = jest.spyOn(person, 'getData')
    const spyConsoleLog = jest.spyOn(console, 'log')

    person.printData()

    expect(spyConsoleLog).toBeCalledWith(DATA)
    expect(spyGetData).toBeCalledTimes(1)
  })
})
