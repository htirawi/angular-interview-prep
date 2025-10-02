import { useState } from "react";
import type { JSX } from "react";
import { ComparisonTable } from "../tables/ComparisonTable";
import { RegularTable } from "../tables/RegularTable";
import {
  isComparisonTable,
  parseComparisonTable,
  parseRegularTable,
  parseHtmlTable,
} from "../tables/tableParsers";
import type { MarkdownRendererProps } from "@/types/ui";

/**
 * Enhanced markdown renderer for technical content
 * Features:
 * - Code block rendering with syntax highlighting
 * - Table detection and rendering (comparison vs regular)
 * - HTML table parsing
 * - Copy-to-clipboard functionality
 * - Dark mode support
 */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedBlocks, setCopiedBlocks] = useState<Set<number>>(new Set());

  const flushCodeBlock = (
    currentCodeBlock: string[],
    codeLanguage: string,
    codeBlockIndex: number,
    elements: JSX.Element[]
  ) => {
    if (currentCodeBlock.length > 0) {
      const code = currentCodeBlock.join("\n");
      const blockIndex = codeBlockIndex;

      elements.push(
        <div key={`code-${blockIndex}`} className="group relative">
          <div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
              {codeLanguage || "code"}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopiedBlocks((prev) => new Set(prev).add(blockIndex));
                setTimeout(() => {
                  setCopiedBlocks((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(blockIndex);
                    return newSet;
                  });
                }, 2000);
              }}
              className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 opacity-0 transition-opacity hover:bg-gray-600 group-hover:opacity-100"
            >
              {copiedBlocks.has(blockIndex) ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-b-lg bg-gray-900 p-4 text-sm leading-relaxed text-gray-100">
            <code>{code}</code>
          </pre>
        </div>
      );
    }
  };

  const flushTable = (tableRows: string[], elements: JSX.Element[]) => {
    if (tableRows.length > 0) {
      // Check if this is a comparison table (3 columns with specific headers)
      const firstRow = tableRows[0];
      const firstRowCells = firstRow
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);

      if (isComparisonTable(firstRowCells)) {
        // Parse comparison table data
        const rows = parseComparisonTable(tableRows);

        if (rows.length > 0) {
          elements.push(
            <ComparisonTable
              key={`comparison-table-${elements.length}`}
              headers={["Feature", "Reactive Forms", "Template-Driven Forms"]}
              rows={rows}
            />
          );
        }
      } else {
        // Regular table rendering
        const rows = parseRegularTable(tableRows);
        elements.push(<RegularTable key={`table-${elements.length}`} rows={rows} />);
      }
    }
  };

  // Parse markdown-like content and render appropriately
  const renderContent = (text: string) => {
    // Check for HTML tables first
    const htmlTableData = parseHtmlTable(text);
    if (htmlTableData) {
      return (
        <div className="space-y-2">
          <ComparisonTable
            headers={["Feature", "Reactive Forms", "Template-Driven Forms"]}
            rows={htmlTableData}
          />
        </div>
      );
    }

    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let codeBlockIndex = 0;
    let inCodeBlock = false;
    const currentCodeBlock: string[] = [];
    let codeLanguage = "";
    let inTable = false;
    let tableRows: string[] = [];

    lines.forEach((line, index) => {
      // Handle code block start
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushCodeBlock(currentCodeBlock, codeLanguage, codeBlockIndex++, elements);
          inCodeBlock = false;
        } else {
          flushTable(tableRows, elements); // Flush any pending table before starting a code block
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Handle table rows (| separated)
      if (line.includes("|") && line.trim().length > 0) {
        const cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell);
        if (cells.length > 1) {
          const isSeparatorRow = cells.every((cell) => cell.match(/^-+$/));

          if (!inTable) {
            flushCodeBlock(currentCodeBlock, codeLanguage, codeBlockIndex++, elements); // Flush any pending code block
            inTable = true;
            tableRows = [];
          }

          if (!isSeparatorRow) {
            tableRows.push(line);
          }
          return;
        }
      }

      // If we were in a table and this line doesn't contain |, flush the table
      if (inTable && !line.includes("|")) {
        flushTable(tableRows, elements);
      }

      // Handle empty lines
      if (line.trim() === "") {
        elements.push(<div key={index} className="mb-2" />);
        return;
      }

      // Handle bold text (**text**)
      if (line.includes("**")) {
        const parts = line.split("**");
        const processedLine = parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <strong key={i} className="font-bold text-gray-900 dark:text-white">
                {part}
              </strong>
            );
          }
          return part;
        });
        elements.push(
          <p key={index} className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {processedLine}
          </p>
        );
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
          {line}
        </p>
      );
    });

    flushCodeBlock(currentCodeBlock, codeLanguage, codeBlockIndex++, elements);
    flushTable(tableRows, elements); // Flush any remaining table at the end
    return elements;
  };

  return <div className="space-y-2">{renderContent(content)}</div>;
}
