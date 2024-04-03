"use client";

import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import Editor from "@/components/lexical-editor/editor";
import { Nodes } from "@/components/lexical-editor/nodes";
import { theme } from "@/components/lexical-editor/theme";
import {
  EditorState,
  SerializedEditorState,
  SerializedLexicalNode,
} from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export default function LexicalEditor({
  setEditorState,
  root,
}: {
  setEditorState: (state: EditorState) => void;
  root?: string;
}) {
  const initialConfig: InitialConfigType = {
    editorState: root,
    namespace: "Lexical-Editor",
    onError: (error: Error) => {
      throw error;
    },
    nodes: [...Nodes],
    theme: theme,
  };

  return (
    <section>
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
        <OnChangePlugin
          onChange={(editorState) => {
            setEditorState(editorState);
          }}
        />
      </LexicalComposer>
    </section>
  );
}
