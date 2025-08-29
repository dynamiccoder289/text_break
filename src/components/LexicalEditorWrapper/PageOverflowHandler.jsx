import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import { $getRoot } from "lexical";

export default function PageOverflowHandler() {
  const [editor] = useLexicalComposerContext();
  const observerRef = useRef(null);

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    // Create a ResizeObserver to monitor content changes
    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target;
        
        // Check if content overflows page boundaries
        const pageContainers = document.querySelectorAll('.page-container');
        pageContainers.forEach((pageContainer, index) => {
          const pageRect = pageContainer.getBoundingClientRect();
          const pageHeight = 1123; // A4 height
          
          // Find elements that might be overflowing
          const elements = pageContainer.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, table');
          elements.forEach((element) => {
            const elementRect = element.getBoundingClientRect();
            const relativeTop = elementRect.top - pageRect.top;
            const relativeBottom = elementRect.bottom - pageRect.top;
            
            // If element extends beyond page height
            if (relativeBottom > pageHeight && relativeTop < pageHeight) {
              // Add visual indicator for overflow
              element.style.borderBottom = '2px dashed #ff6b6b';
              element.title = 'Content may be cut off at page boundary';
            } else {
              // Remove overflow indicator
              element.style.borderBottom = '';
              element.title = '';
            }
          });
        });
      }
    });

    // Start observing
    observerRef.current.observe(rootElement);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [editor]);

  return null;
}