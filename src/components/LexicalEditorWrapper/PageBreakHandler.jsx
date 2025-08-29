import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot, $createParagraphNode } from "lexical";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { $createPageBreakNode } from "../CustomNodes/PageBreakNode";

export default function PageBreakHandler() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleAutoPageBreaks = () => {
      const rootElement = editor.getRootElement();
      if (!rootElement) return;

      const pageHeight = 1055; // A4 page height minus padding
      let currentHeight = 0;
      let needsPageBreak = false;

      const children = Array.from(rootElement.children);
      
      children.forEach((child, index) => {
        const childHeight = child.offsetHeight;
        
        // Check if this element would overflow the current page
        if (currentHeight + childHeight > pageHeight && currentHeight > 0) {
          needsPageBreak = true;
          currentHeight = childHeight; // Start new page with this element
        } else {
          currentHeight += childHeight;
        }

        // Insert page break if needed
        if (needsPageBreak && index > 0) {
          editor.update(() => {
            const root = $getRoot();
            const nodes = root.getChildren();
            
            if (nodes[index - 1]) {
              const pageBreakNode = $createPageBreakNode();
              nodes[index - 1].insertAfter(pageBreakNode);
            }
          });
          needsPageBreak = false;
        }
      });
    };

    // Debounced auto page break insertion
    let timeoutId;
    const debouncedHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleAutoPageBreaks, 500);
    };

    const removeListener = editor.registerUpdateListener(() => {
      debouncedHandler();
    });

    return () => {
      removeListener();
      clearTimeout(timeoutId);
    };
  }, [editor]);

  return null;
}