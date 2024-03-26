"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import Editor from "@/components/lexical-editor/editor";

export default function LexicalEditor() {
  const initialConfig: InitialConfigType = {
    namespace: "Lexical-Editor",
    onError: (error: Error) => {
      throw error;
    },
  };

  return (
    <section>
      <LexicalComposer initialConfig={initialConfig}>
        <Editor />
      </LexicalComposer>
    </section>
  );
}
