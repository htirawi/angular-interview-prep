import type { ComparisonRow, TableRow } from "../../types";

/**
 * Utility functions for parsing and detecting different table types
 */

/**
 * Detects if a markdown table is a comparison table
 */
export function isComparisonTable(firstRowCells: string[]): boolean {
  return (
    firstRowCells.length === 3 &&
    (firstRowCells.some((cell) => cell.toLowerCase().includes("reactive")) ||
      firstRowCells.some((cell) => cell.toLowerCase().includes("template")) ||
      firstRowCells.some((cell) => cell.toLowerCase().includes("difference")) ||
      firstRowCells.some((cell) => cell.toLowerCase().includes("comparison")))
  );
}

/**
 * Parses markdown table rows into comparison format
 */
export function parseComparisonTable(tableRows: string[]): ComparisonRow[] {
  return tableRows
    .filter((row) => {
      const cells = row
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      return cells.length === 3 && !cells.every((cell) => cell.match(/^-+$/));
    })
    .map((row) => {
      const cells = row
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      return {
        feature: cells[0].replace(/\*\*(.*?)\*\*/g, "$1"),
        reactive: cells[1].replace(/\*\*(.*?)\*\*/g, "$1"),
        template: cells[2].replace(/\*\*(.*?)\*\*/g, "$1"),
      };
    });
}

/**
 * Parses markdown table rows into regular table format
 */
export function parseRegularTable(tableRows: string[]): TableRow[] {
  return tableRows
    .filter((row) => {
      const cells = row
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      return cells.length > 1 && !cells.every((cell) => cell.match(/^-+$/));
    })
    .map((row) => {
      const cells = row
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      const isHeaderRow =
        cells.some((cell) => cell.includes("**")) || cells.every((cell) => cell.match(/^-+$/));

      return {
        cells: cells.map((cell) => cell.replace(/\*\*(.*?)\*\*/g, "$1")),
        isHeader: isHeaderRow,
      };
    });
}

/**
 * Parses HTML tables and converts to comparison format
 */
export function parseHtmlTable(htmlContent: string): ComparisonRow[] | null {
  const tableMatch = htmlContent.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return null;

  const tableContent = tableMatch[1];
  const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  if (!rows || rows.length < 2) return null;

  const parsedRows = rows
    .map((row) => {
      const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi);
      if (!cells || cells.length !== 3) return null;

      return {
        feature: cells[0].replace(/<[^>]*>/g, "").trim(),
        reactive: cells[1].replace(/<[^>]*>/g, "").trim(),
        template: cells[2].replace(/<[^>]*>/g, "").trim(),
      };
    })
    .filter((row) => row !== null);

  return parsedRows.length > 0 ? parsedRows : null;
}
