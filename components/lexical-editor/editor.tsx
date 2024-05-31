import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React, { useState } from "react";
import MarkdownPlugin from "@/components/lexical-editor/plugins/MarkdownPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import ListMaxIndentLevelPlugin from "@/components/lexical-editor/plugins/ListMaxIndentLevelPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import ToolBarPlugin from "@/components/lexical-editor/plugins/ToolBarPlugin";
import CodeHighlightPlugin from "@/components/lexical-editor/plugins/CodeHighlightPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import LexicalAutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from "./context/SharedHistoryContext";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import BlockPickerPlugin from "./plugins/BlockPickerPlugin";

export default function Editor() {
  const { historyState } = useSharedHistoryContext();
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div>
      <SharedHistoryContext>
        <ToolBarPlugin setIsLinkEditMode={setIsLinkEditMode} />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <div ref={onRef}>
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
        {floatingAnchorElem && (
          <>
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          </>
        )}
        <HistoryPlugin externalHistoryState={historyState} />
        <BlockPickerPlugin />
        <LinkPlugin />
        <LexicalAutoLinkPlugin />
        <CodeHighlightPlugin />
        <MarkdownPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin />
        <TabIndentationPlugin />
      </SharedHistoryContext>
    </div>
  );
}
