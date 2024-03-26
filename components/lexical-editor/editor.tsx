import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React, { useState } from "react";

export default function Editor() {
  return (
    <div className="relative">
      <RichTextPlugin
        contentEditable={
          <div>
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
    </div>
  );
}
