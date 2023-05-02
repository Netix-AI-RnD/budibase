import { csv } from "../exporters"

describe("exporters", () => {
  describe("csv", () => {
    test("basic rows can be casted", () => {
      const headers = ["id", "name", "age"]
      const rows = [
        { id: 1, name: "Jack", age: 30 },
        { id: 2, name: "Sam", age: 34 },
      ]

      const result = csv(headers, rows)
      expect(result).toEqual(
        '"id","name","age"\n"1","Jack","30"\n"2","Sam","34"'
      )
    })

    test("rows with empty values can be casted", () => {
      const headers = ["id", "name", "age", "title", "other"]
      const rows = [
        { id: 1, name: "Jack", age: 30, title: "Mr" },
        { id: 2, name: "Sam", age: 34 },
      ]

      const result = csv(headers, rows)
      expect(result).toEqual(
        '"id","name","age","title","other"\n"1","Jack","30","Mr",\n"2","Sam","34",,'
      )
    })

    test("rows with array values can be casted", () => {
      const headers = ["id", "name", "age", "hobbies"]
      const rows = [
        { id: 1, name: "Jack", age: 30, hobbies: ["climbing", "running"] },
        { id: 2, name: "Sam", age: 34, hobbies: ["cooking"] },
      ]

      const result = csv(headers, rows)
      expect(result).toEqual(
        '"id","name","age","hobbies"\n"1","Jack","30",["climbing","running"]\n"2","Sam","34",["cooking"]'
      )
    })
  })
})
