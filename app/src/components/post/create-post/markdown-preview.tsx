// components/create-post/markdown-preview.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CheckSquare, Square } from "lucide-react";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="min-h-[120px] text-base leading-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="my-4">
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-800 px-1.5 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          // New Checkbox List Support
          ul({ children, className }) {
            if (className === "contains-task-list") {
              return <ul className="space-y-2">{children}</ul>;
            }
            return (
              <ul className="list-disc list-inside mb-4 space-y-1">
                {children}
              </ul>
            );
          },
          li({ children, className, checked }) {
            if (className === "task-list-item") {
              return (
                <li className="flex items-start gap-2">
                  {checked ? (
                    <CheckSquare className="w-4 h-4 mt-1 text-purple-500" />
                  ) : (
                    <Square className="w-4 h-4 mt-1 text-gray-500" />
                  )}
                  <span>{children}</span>
                </li>
              );
            }
            return <li className="ml-4">{children}</li>;
          },
          // Other markdown elements...
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mb-3 mt-4">{children}</h3>
          ),
          // Add callouts for important info
          blockquote: ({ children }) => (
            <div className="my-4 rounded-lg bg-purple-500/10 border-l-4 border-purple-500">
              <div className="p-4">{children}</div>
            </div>
          ),
          // Better link handling
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-purple-400 hover:text-purple-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content || "*Nothing to preview*"}
      </ReactMarkdown>
    </div>
  );
}
