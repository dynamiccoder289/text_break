// src/components/CustomPlugins/PageBreakNode.jsx
import { DecoratorNode } from "lexical";
import * as React from "react";

// Custom Page Break Node
export class PageBreakNode extends DecoratorNode {
  static getType() {
    return "pagebreak";
  }

  static clone(node) {
    return new PageBreakNode(node.__key);
  }

  createDOM() {
    const div = document.createElement("div");
    div.style.pageBreakAfter = "always";
    div.style.breakAfter = "page";
    div.style.height = "0";
    div.style.border = "none";
    return div;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <div
        style={{
          pageBreakAfter: "always",
          breakAfter: "page",
          height: "0px",
          border: "none",
        }}
      />
    );
  }
}

// Helper function
export function $createPageBreakNode() {
  return new PageBreakNode();
}

export function $isPageBreakNode(node) {
  return node instanceof PageBreakNode;
}
