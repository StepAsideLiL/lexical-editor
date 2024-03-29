import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React, { useState } from "react";
import MarkdownPlugin from "@/components/lexical-editor/plugins/MarkdownPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ListMaxIndentLevelPlugin from "@/components/lexical-editor/plugins/ListMaxIndentLevelPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";

export default function Editor() {
  const [floatingAnchorElement, setFloatingAnchorElement] = useState<
    HTMLDivElement | undefined
  >(undefined);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElement(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      <RichTextPlugin
        contentEditable={
          <div ref={onRef}>
            <ContentEditable className="h-96 focus-visible:outline-none" />
          </div>
        }
        placeholder={
          <div className="absolute top-0 -z-50 text-muted-foreground">
            Write...
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownPlugin />
      <ListPlugin />
      <ListMaxIndentLevelPlugin />
      <TabIndentationPlugin />
    </div>
  );
}
