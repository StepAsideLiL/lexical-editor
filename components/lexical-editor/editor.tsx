import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";
import MarkdownPlugin from "@/components/lexical-editor/plugins/MarkdownPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ListMaxIndentLevelPlugin from "@/components/lexical-editor/plugins/ListMaxIndentLevelPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import ToolBarPlugin from "@/components/lexical-editor/plugins/ToolBarPlugin";
import CodeHighlightPlugin from "@/components/lexical-editor/plugins/CodeHighlightPlugin";

export default function Editor() {
  return (
    <div>
      <ToolBarPlugin />
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div>
              <ContentEditable className="h-96 focus-visible:outline-none py-5" />
            </div>
          }
          placeholder={
            <div className="absolute top-0 -z-50 text-muted-foreground py-5">
              Write...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <CodeHighlightPlugin />
      <MarkdownPlugin />
      <ListPlugin />
      <ListMaxIndentLevelPlugin />
      <TabIndentationPlugin />
    </div>
  );
}
