"use client";

import LexicalEditor from "@/components/lexical-editor/lexical-editor";
import { Button } from "@/components/ui/button";
import { EditorState } from "lexical";
import { useState } from "react";
import { save } from "./actions";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";

export default function Client({ root }: { root: string }) {
  const [disable, setDisable] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>();

  async function handleClick() {
    console.log(JSON.stringify(editorState));

    const res = await save(JSON.stringify(editorState));
    setDisable(true);
    if (res) {
      if (res.success) {
        toast.success(res.message);
        setDisable(false);
      } else {
        toast.error(res.message);
        setDisable(false);
      }
    } else {
      toast.error("No internet");
      setDisable(false);
    }
  }

  return (
    <div className="space-y-5">
      {!disable ? (
        <Button onClick={() => handleClick()}>Save</Button>
      ) : (
        <Button>
          <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Saving...
        </Button>
      )}
      <LexicalEditor setEditorState={setEditorState} root={root} />
    </div>
  );
}
