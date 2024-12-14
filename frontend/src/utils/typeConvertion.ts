/**
 * Converts an SQL type to a JavaScript type.
 *
 * @param sqlType - The SQL type to convert.
 * @returns The corresponding JavaScript type.
 */
export function sqlToJsType(sqlType: string): string {
  switch (sqlType.toLowerCase()) {
    case "int":
    case "integer":
    case "smallint":
    case "bigint":
    case "tinyint":
    case "mediumint":
    case "decimal":
    case "numeric":
    case "float":
    case "double":
    case "real":
      return "number";
    case "char":
    case "varchar":
    case "text":
    case "tinytext":
    case "mediumtext":
    case "longtext":
    case "nchar":
    case "nvarchar":
    case "ntext":
    case "enum":
    case "set":
      return "string";
    case "date":
    case "datetime":
    case "timestamp":
    case "time":
    case "year":
      return "Date";
    case "boolean":
    case "bool":
    case "bit":
      return "boolean";
    case "json":
      return "object";
    case "blob":
    case "binary":
    case "varbinary":
    case "tinyblob":
    case "mediumblob":
    case "longblob":
      return "Buffer";
    default:
      return "unknown";
  }
}
