"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import Editor from "@/components/lexical-editor/editor";
import { Nodes } from "@/components/lexical-editor/nodes";
import { theme } from "@/components/lexical-editor/theme";
import { EditorState } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export default function LexicalEditor({
  setEditorState,
}: {
  setEditorState: (state: EditorState) => void;
}) {
  const initialConfig: InitialConfigType = {
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
