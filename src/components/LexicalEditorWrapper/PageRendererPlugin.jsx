import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getRoot } from "lexical";
import { $isPageBreakNode } from "../../components/CustomPlugins/PageBreakNode";

export default function PageRendererPlugin() {
  const [editor] = useLexicalComposerContext();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const newPages = [[]];
        root.getChildren().forEach((child) => {
          if ($isPageBreakNode(child)) {
            // Start a new page
            newPages.push([]);
          } else {
            // Store serializable data, NOT the node itself
            newPages[newPages.length - 1].push({
              key: child.getKey(),
              text: child.getTextContent(),
            });
          }
        });
        setPages(newPages);
      });
    });
  }, [editor]);

  return (
    <div className="pages-container">
      {pages.map((nodes, i) => (
        <div key={i} className="page">
          {nodes.map((node) => (
            <div key={node.key}>{node.text}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
