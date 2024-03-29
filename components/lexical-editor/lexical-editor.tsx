"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import Editor from "@/components/lexical-editor/editor";
import { Nodes } from "@/components/lexical-editor/nodes";
import { theme } from "@/components/lexical-editor/theme";

export default function LexicalEditor() {
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
      </LexicalComposer>
    </section>
  );
}
