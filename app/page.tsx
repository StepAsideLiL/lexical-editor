"use client";

// import EditorV1 from "@/components/editors/editor-v1";
import LexicalEditor from "@/components/lexical-editor/lexical-editor";
import { EditorState } from "lexical";
import { useState } from "react";

export default function Page() {
  const [editorState, setEditorState] = useState<EditorState>();

  return (
    <main className="container">
      <LexicalEditor setEditorState={setEditorState} />
    </main>
  );
}
