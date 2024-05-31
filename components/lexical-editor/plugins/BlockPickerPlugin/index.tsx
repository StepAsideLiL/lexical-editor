import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { LexicalEditor, TextNode } from "lexical";
import { LucideIcon, PilcrowIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

class BlockPickerOption extends MenuOption {
  title: string;
  icon: LucideIcon;
  keywords: Array<string>;
  keyboardShortcut?: string;
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon: LucideIcon;
      keywords: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    }
  ) {
    super(title);
    this.title = title;
    this.icon = options.icon;
    this.keywords = options.keywords || [];
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function getBaseOptions(editor: LexicalEditor) {
  return [
    new BlockPickerOption("Paragraph", {
      icon: PilcrowIcon,
      keywords: ["paragraph", "normal", "p", "text"],
      onSelect: () => {},
    }),
  ];
}

export default function BlockPickerPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);

    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, "i");

    return [
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword))
      ),
    ];
  }, [editor, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: BlockPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  // console.log(queryString);

  return (
    <>
      <LexicalTypeaheadMenuPlugin<BlockPickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
        ) =>
          anchorElementRef.current && options.length
            ? createPortal(
                <div className="bg-background p-2">
                  {options.map((option, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <option.icon /> {option.title}
                    </li>
                  ))}
                </div>,
                anchorElementRef.current
              )
            : null
        }
      />
    </>
  );
}
