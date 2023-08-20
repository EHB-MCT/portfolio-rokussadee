const helpers = require("../common/helper.js")

describe("convertMilesToKM test", () => {
  test("if outcome is correct", () => { 
    expect(helpers.convertMilesToKM(1)).toBe(1.61)
    expect(helpers.convertMilesToKM(10)).toBe(16.1)
    expect(helpers.convertMilesToKM(-1)).toBe(1.61)
    expect(helpers.convertMilesToKM(-5.27)).toBe(8.48)
   })
  test("if user can send string", () => {
    expect(helpers.convertMilesToKM("hello")).toBeUndefined()
  })
})

describe("checkStringLength test", () => {
  test("if user inputs a string of more than or equal to 8 and less than or equal to 15 characters", () => {
    expect(helpers.checkStringLength("hello")).toBeFalsy()
    expect(helpers.checkStringLength("pietjepukje")).toBeTruthy()
    expect(helpers.checkStringLength("12345678")).toBeTruthy()
  })
  test("if user inputs other types", () => {
    expect(helpers.checkStringLength(null)).toBeFalsy()
    expect(helpers.checkStringLength(undefined)).toBeFalsy()
    expect(helpers.checkStringLength(1)).toBeFalsy()
    expect(helpers.checkStringLength({})).toBeFalsy()
  })
  test("if user inputs a longer string", () => {
    expect(helpers.checkStringLength("1 2 3 4 5 6 7 8 9 0 1 2 3 4 5")).toBeFalsy()
  })
})

describe("bodyCheck test", () => {
  const body = {title: "hello", imageURL: "https://image.be", excerpt: "hello world excerpt long one"}
  test("if user input is in order", () => {
    expect(helpers.bodyCheck(body)).toBeTruthy()
  })
  test("if user input misses content", () => {
    expect(helpers.bodyCheck({...body, title: null})).toBeFalsy()
    expect(helpers.bodyCheck({...body, imageURL: null})).toBeFalsy()
    expect(helpers.bodyCheck({...body, excerpt: null})).toBeFalsy()
  })
  test("if user input has faulty content", () => {
    expect(helpers.bodyCheck({...body, title: "1234567890"})).toBeFalsy()
    expect(helpers.bodyCheck({...body, imageURL: "faultylink"})).toBeFalsy()
    expect(helpers.bodyCheck({...body, excerpt: null})).toBeFalsy()
  })
})

describe("checkIfURL test", () => {
  test("if user input is a link", () => {
    expect(helpers.checkIfURL("https://image.be")).toBeTruthy()
    expect(helpers.checkIfURL("/image.bruh")).toBeTruthy()
  })
  test("if user input is not a link", () => {
    expect(helpers.checkIfURL("link")) .toBeFalsy()
    expect(helpers.checkIfURL()).toBeFalsy()
    expect(helpers.checkIfURL(null)).toBeFalsy()
    expect(helpers.checkIfURL(undefined)).toBeFalsy()
    expect(helpers.checkIfURL(1)).toBeFalsy()
  })
})

describe("capitalise test", () => {
  test("if user input is string", ()=> {
    expect(helpers.capitalise("tekst")).toBeTruthy()
  })
  test("if user input is not a string", () => {
    expect(helpers.capitalise(0)).toBeFalsy()
    expect(helpers.capitalise(null)).toBeFalsy()
    expect(helpers.capitalise(undefined)).toBeFalsy()
    expect(helpers.capitalise({})).toBeFalsy()
    expect(helpers.capitalise([])).toBeFalsy()
  })
})

describe("shortenText test", () => {
  test("if user input is in order", ()=> {
    expect(helpers.shortenText("tekst", 10)).toBeTruthy()
  })
  test("if user inputs wrong type for text", ()=> {
    expect(helpers.shortenText(10, 10)).toBeFalsy()
    expect(helpers.shortenText(null, 10)).toBeFalsy()
    expect(helpers.shortenText(undefined, 10)).toBeFalsy()
    expect(helpers.shortenText({}, 10)).toBeFalsy()
    expect(helpers.shortenText([], 10)).toBeFalsy()
  })
  test("if user inputs wrong type for length", ()=> {
    expect(helpers.shortenText("text", "10")).toBeFalsy()
    expect(helpers.shortenText("text", null)).toBeFalsy()
    expect(helpers.shortenText("text", undefined)).toBeFalsy()
    expect(helpers.shortenText("text", {})).toBeFalsy()
    expect(helpers.shortenText("text", [])).toBeFalsy()
  })
  test("if output is shortened", () => {
    const longText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem totam quia accusamus quaerat atque sint? Et ut dolor quo molestiae itaque accusamus laboriosam, mollitia, quam dicta voluptates incidunt dolore pariatur."
    const shortenedToTen = "Lorem ipsu..."
    expect(helpers.shortenText(longText, 10)).toMatch(shortenedToTen)
    expect(helpers.shortenText(shortenedToTen, 10)).toEqual(shortenedToTen)
    expect(helpers.shortenText(longText, 10)).not.toEqual(longText)
  })
})
