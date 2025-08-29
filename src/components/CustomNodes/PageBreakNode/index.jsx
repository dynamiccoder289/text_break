import { DecoratorNode } from "lexical";
import React from "react";
 
export class PageBreakNode extends DecoratorNode {
  static getType() {
    return "page-break";
  }
 
  static clone(node) {
    return new PageBreakNode(node.__key);
  }
 
  static importJSON(serializedNode) {
    return new PageBreakNode();
  }
 
  exportJSON() {
    return {
      type: "page-break",
      version: 1,
    };
  }
 
  static importDOM() {
    return {
      div: (domNode) => {
        if (domNode.style.pageBreakBefore === 'always' ||
            domNode.style.breakBefore === 'page' ||
            domNode.classList.contains('page-break')) {
          return {
            conversion: () => ({ node: $createPageBreakNode() }),
            priority: 1,
          };
        }
        return null;
      },
    };
  }
 
  exportDOM() {
    const element = document.createElement("div");
    element.style.pageBreakBefore = "always";
    element.style.breakBefore = "page";
    element.className = "page-break";
    element.style.height = "0";
    element.style.margin = "0";
    element.style.padding = "0";
    element.style.border = "none";
    element.style.display = "block";
    return { element };
  }
 
  createDOM() {
    const div = document.createElement("div");
    return div;
  }
 
  updateDOM() {
    return false;
  }
 
  decorate() {
    return (
 
      <div
  className="page-break"
  style={{
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0",
    color: "#999",
    fontSize: "14px",
    fontWeight: "500",
    pageBreakBefore: "always",
    breakBefore: "page",
    height: "20px",
    borderTop: "1px dashed #ccc",
    position: "relative"
  }}
>
  <span 
    style={{ 
      position: "absolute",
      left: "50%",
      top: "-10px",
      transform: "translateX(-50%)",
      backgroundColor: "white",
      padding: "0 10px",
      fontSize: "12px",
      color: "#999"
    }}
  >
    Page Break
  </span>
</div>
 
    );
  }
 
  isInline() {
    return false;
  }
 
  isKeyboardSelectable() {
    return true;
  }
}
 
export function $createPageBreakNode() {
  return new PageBreakNode();
}
 
export function $isPageBreakNode(node) {
  return node instanceof PageBreakNode;
}