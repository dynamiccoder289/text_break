import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef, useState } from "react";
import { $getRoot } from "lexical";
import { $isPageBreakNode } from "../CustomNodes/PageBreakNode";

export default function TextFlowPlugin({ onPagesChange }) {
  const [editor] = useLexicalComposerContext();
  const [pages, setPages] = useState([]);
  const measurementRef = useRef(null);

  useEffect(() => {
    const measureTextFlow = () => {
      const rootElement = editor.getRootElement();
      if (!rootElement) return;

      // Create a measurement container
      if (!measurementRef.current) {
        measurementRef.current = document.createElement('div');
        measurementRef.current.style.cssText = `
          position: absolute;
          top: -9999px;
          left: -9999px;
          width: 726px;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          visibility: hidden;
          pointer-events: none;
        `;
        document.body.appendChild(measurementRef.current);
      }

      const measureContainer = measurementRef.current;
      measureContainer.innerHTML = rootElement.innerHTML;

      // Calculate page breaks based on content height
      const pageHeight = 1055; // A4 page height minus padding (1123 - 68)
      const pages = [];
      let currentPage = { content: [], height: 0 };
      
      const children = Array.from(measureContainer.children);
      
      children.forEach((child, index) => {
        const childClone = child.cloneNode(true);
        measureContainer.innerHTML = '';
        measureContainer.appendChild(childClone);
        
        const childHeight = measureContainer.offsetHeight;
        
        // Check if this is a page break node
        if (child.classList.contains('page-break') || 
            child.style.pageBreakBefore === 'always' ||
            child.style.breakBefore === 'page') {
          // Force new page
          if (currentPage.content.length > 0) {
            pages.push(currentPage);
          }
          currentPage = { content: [], height: 0 };
          return;
        }
        
        // Check if adding this element would exceed page height
        if (currentPage.height + childHeight > pageHeight && currentPage.content.length > 0) {
          // Start new page
          pages.push(currentPage);
          currentPage = { content: [index], height: childHeight };
        } else {
          // Add to current page
          currentPage.content.push(index);
          currentPage.height += childHeight;
        }
      });
      
      // Add the last page if it has content
      if (currentPage.content.length > 0) {
        pages.push(currentPage);
      }
      
      // Ensure at least one page
      if (pages.length === 0) {
        pages.push({ content: [], height: 0 });
      }
      
      setPages(pages);
      if (onPagesChange) {
        onPagesChange(pages);
      }
    };

    // Register update listener
    const removeListener = editor.registerUpdateListener(() => {
      setTimeout(measureTextFlow, 100);
    });

    // Initial measurement
    measureTextFlow();

    return () => {
      removeListener();
      if (measurementRef.current) {
        document.body.removeChild(measurementRef.current);
        measurementRef.current = null;
      }
    };
  }, [editor, onPagesChange]);

  return null;
}