import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CheckSquare, Square } from "lucide-react";

interface MarkdownPreviewProps {
  content: string;
  title?: string;
}

export function MarkdownPreview({ content, title }: MarkdownPreviewProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h1 className="text-2xl font-bold text-white/90 mb-6">{title}</h1>
      )}
      <div className="prose prose-invert max-w-none">
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
            ul({ children, className }) {
              if (className === "contains-task-list") {
                return <ul className="space-y-2 list-none">{children}</ul>;
              }
              return (
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {children}
                </ul>
              );
            },
            li({ children, className, checked }) {
              if (className === "task-list-item") {
                return (
                  <li className="flex items-start gap-2">
                    {checked ? (
                      <CheckSquare className="w-4 h-4 mt-1 text-purple-500 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 mt-1 text-gray-500 flex-shrink-0" />
                    )}
                    <span className="flex-1">{children}</span>
                  </li>
                );
              }
              return <li className="ml-4">{children}</li>;
            },
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0 text-white/90">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold mb-3 mt-5 text-white/90">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold mb-3 mt-4 text-white/85">
                {children}
              </h3>
            ),
            blockquote: ({ children }) => (
              <div className="my-4 rounded-lg bg-purple-500/10 border-l-4 border-purple-500">
                <div className="p-4">{children}</div>
              </div>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 hover:decoration-purple-300/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-white/80 leading-relaxed">{children}</p>
            ),
          }}
        >
          {content || "*Nothing to preview*"}
        </ReactMarkdown>
      </div>
    </div>
  );
}
