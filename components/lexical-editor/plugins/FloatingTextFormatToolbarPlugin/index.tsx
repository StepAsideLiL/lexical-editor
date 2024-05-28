import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isCodeHighlightNode } from "@lexical/code";
import { mergeRegister } from "@lexical/utils";
import { getDOMRangeRect } from "../../utils/getDOMRangeRect";
import { setFloatingElemPosition } from "../../utils/setFloatingElemPosition";
import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  Link2Icon,
  UnderlineIcon,
} from "lucide-react";

function FloatingTextFormatToolbar({
  editor,
  anchorElem = document.body,
  isBold,
  isItalic,
  isUnderline,
  isLink,
  isCode,
}: // isStrikethrough,
// isSubscript,
// isSuperscript,
{
  editor: LexicalEditor;
  anchorElem?: HTMLElement;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isLink: boolean;
  isCode: boolean;
  // isStrikethrough: boolean;
  // isSubscript: boolean;
  // isSuperscript: boolean;
}) {
  const popupCharStylesEditorRef = useRef<HTMLDivElement>(null);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(
        rangeRect,
        popupCharStylesEditorElem,
        anchorElem,
        isLink
      );
    }
  }, [editor, anchorElem, isLink]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  return (
    <div
      ref={popupCharStylesEditorRef}
      className="flex absolute top-0 left-0 bg-background border"
    >
      <Toggle
        pressed={isBold ? true : false}
        aria-label="Toggle Bold"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={isItalic ? true : false}
        aria-label="Toggle Italic"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={isUnderline ? true : false}
        aria-label="Toggle Underline"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={isCode ? true : false}
        aria-label="Toggle Code"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={isLink ? true : false}
        aria-label="Toggle italic"
        onClick={insertLink}
      >
        <Link2Icon className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default function FloatingTextFormatToolbarPlugin({
  anchorElem = document.body,
}: {
  anchorElem: HTMLElement;
}) {
  const [editor] = useLexicalComposerContext();

  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  // const [isStrikethrough, setIsStrikethrough] = useState(false);
  // const [isSubscript, setIsSubscript] = useState(false);
  // const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing()) {
        return;
      }

      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      // setIsStrikethrough(selection.hasFormat("strikethrough"));
      // setIsSubscript(selection.hasFormat("subscript"));
      // setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent() !== ""
      ) {
        setIsText($isTextNode(node) || $isParagraphNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, "");
      if (!selection.isCollapsed() && rawTextContent === "") {
        setIsText(false);
        return;
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => {
      document.removeEventListener("selectionchange", updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      })
    );
  }, [editor, updatePopup]);

  if (!isText) {
    return null;
  }

  return createPortal(
    <FloatingTextFormatToolbar
      editor={editor}
      anchorElem={anchorElem}
      isBold={isBold}
      isItalic={isItalic}
      isUnderline={isUnderline}
      isLink={isLink}
      isCode={isCode}
      // isStrikethrough={isStrikethrough}
      // isSubscript={isSubscript}
      // isSuperscript={isSuperscript}
    />,
    anchorElem
  );
}
