"use client";

import {
  $getRoot,
  $getSelection,
  EditorState,
  SerializedEditorState,
  SerializedLexicalNode,
} from "lexical";
import { useEffect, useRef, useState } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Button } from "@/components/ui/button";

const theme = {
  // Theme styling goes here
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function EditorV1() {
  const [editorState1, setEditorState1] =
    useState<SerializedEditorState<SerializedLexicalNode>>();
  const [editorState2, setEditorState2] = useState<EditorState>();
  const [editorState3, setEditorState3] = useState<EditorState>();

  const editorStateRef = useRef<EditorState>();

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  console.log(editorState1);
  console.log(editorState2);
  console.log(editorState3);

  return (
    <div className="relative">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-96 focus-visible:outline-none" />
          }
          placeholder={
            <div className="absolute top-0 text-muted-foreground">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            const editorStateJSON = editorState.toJSON();
            editorStateRef.current = editorState;
            setEditorState1(editorStateJSON);
            setEditorState2(editorState);
          }}
        />

        <Button
          onClick={() => {
            if (editorStateRef.current) {
              setEditorState3(editorStateRef.current);
            }
          }}
        >
          Save
        </Button>
      </LexicalComposer>
    </div>
  );
}
