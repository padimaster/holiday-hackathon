import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MarkdownTips() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-purple-500 hover:text-purple-400 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={5} className="p-0 w-80" side="left">
        <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg border border-purple-500/20">
          {/* Header */}
          <div className="px-4 py-3 bg-purple-500/10 border-b border-purple-500/20 rounded-t-lg">
            <div className="flex items-center gap-2 text-purple-300">
              <HelpCircle className="w-4 h-4" />
              <span className="font-semibold">Tech Pills Guide</span>
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-6">
              {/* Text Styling */}
              <section>
                <h4 className="text-purple-300 font-medium mb-3 flex items-center gap-2">
                  Text Formatting
                </h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3 text-sm">
                    <code className="bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">**bold**</code>
                    <span className="text-gray-500">→</span>
                    <span className="font-bold text-white">bold text</span>
                  </div>
                  <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3 text-sm">
                    <code className="bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">*italic*</code>
                    <span className="text-gray-500">→</span>
                    <span className="italic text-white">italic text</span>
                  </div>
                  <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3 text-sm">
                    <code className="bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">`code`</code>
                    <span className="text-gray-500">→</span>
                    <code className="bg-purple-500/10 px-2 py-1 rounded text-white">inline code</code>
                  </div>
                </div>
              </section>

              {/* Code Blocks */}
              <section>
                <h4 className="text-purple-300 font-medium mb-3">Code Blocks</h4>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-sm font-mono">
                  <p className="text-purple-300">```javascript</p>
                  <p className="text-gray-300">function example() {'{'}</p>
                  <p className="text-gray-300 pl-4">return &quot;Hello World&quot;;</p>
                  <p className="text-gray-300">{'}'}</p>
                  <p className="text-purple-300">```</p>
                </div>
              </section>

              {/* Task Lists */}
              <section>
                <h4 className="text-purple-300 font-medium mb-3">Task Lists</h4>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-sm font-mono space-y-1">
                  <p className="text-gray-300">- [ ] Pending task</p>
                  <p className="text-gray-300">- [x] Completed task</p>
                </div>
              </section>

              {/* Links & Images */}
              <section>
                <h4 className="text-purple-300 font-medium mb-3">Links & Images</h4>
                <div className="space-y-2 text-sm">
                  <code className="block bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                    [link text](URL)
                  </code>
                  <code className="block bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                    ![image alt](URL)
                  </code>
                </div>
              </section>

              {/* Special Tech Pills Features */}
              <section>
                <h4 className="text-purple-300 font-medium mb-3">Important Notes</h4>
                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-sm font-mono">
                  <p className="text-gray-300">&gt; Important info here</p>
                  <p className="text-gray-300">&gt; Multi-line notes</p>
                  <p className="text-gray-300">&gt; work too</p>
                </div>
              </section>

              {/* Best Practices */}
              <section className="pb-2">
                <h4 className="text-purple-300 font-medium mb-3">Writing Tips</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    Start with a clear introduction
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    Include code examples when relevant
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    Use checklists for step-by-step guides
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    Add #hashtags for better discovery
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    Keep it concise but informative
                  </li>
                </ul>
              </section>
            </div>
          </ScrollArea>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}