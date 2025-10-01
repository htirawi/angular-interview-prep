// Table components exports
export { ComparisonTable } from "./ComparisonTable";
export { RegularTable } from "./RegularTable";
export type { ComparisonRow, ComparisonTableProps } from "./ComparisonTable";
export type { TableRow, RegularTableProps } from "./RegularTable";

// Table parsing utilities
export {
  isComparisonTable,
  parseComparisonTable,
  parseRegularTable,
  parseHtmlTable,
} from "./tableParsers";
