import { Row, TableSchema } from "@budibase/types"

export function csv(headers: string[], rows: Row[]) {
  function stringifyValue(val: any) {
    let result = ""

    if (Array.isArray(val)) {
      result = `[${val.map(stringifyValue).join(",")}]`
    } else if (typeof val === "object" && !(val instanceof Date)) {
      result = `"${JSON.stringify(val).replace(/"/g, "'")}"`
    } else if (val !== undefined) {
      result = `"${val}"`
    }
    return result.trim()
  }

  let csv = headers.map(key => `"${key}"`).join(",")

  for (let row of rows) {
    csv = `${csv}\n${headers
      .map(header => stringifyValue(row[header]))
      .join(",")}`
  }
  return csv
}

export function json(rows: Row[]) {
  return JSON.stringify(rows, undefined, 2)
}

export function jsonWithSchema(schema: TableSchema, rows: Row[]) {
  const newSchema: TableSchema = {}
  Object.values(schema).forEach(column => {
    if (!column.autocolumn) {
      newSchema[column.name] = column
    }
  })
  return JSON.stringify({ schema: newSchema, rows }, undefined, 2)
}

export enum Format {
  CSV = "csv",
  JSON = "json",
  JSON_WITH_SCHEMA = "jsonWithSchema",
}

export function isFormat(format: any): format is Format {
  return Object.values(Format).includes(format as Format)
}
