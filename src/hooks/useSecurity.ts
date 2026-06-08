import { useEffect } from 'react';

export const useSecurity = () => {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Drag & Drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Disable Copy & Cut
    const handleCopyCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // 4. Disable DevTools Shortcuts & Print
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'I')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (e.metaKey && e.altKey && e.key === 'J')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent Ctrl+Shift+C / Cmd+Option+C (Inspect Element selection)
      if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (e.metaKey && e.altKey && e.key === 'C')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent Ctrl+U / Cmd+Option+U (View Source)
      if ((e.ctrlKey && e.key === 'U') || (e.metaKey && e.altKey && e.key === 'U') || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Prevent Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey && e.key === 'P') || (e.metaKey && e.key === 'P') || (e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey && e.key === 'S') || (e.metaKey && e.key === 'S') || (e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Ctrl+C / Cmd+C (Copy)
      if ((e.ctrlKey && e.key === 'C') || (e.metaKey && e.key === 'C') || (e.ctrlKey && e.key === 'c') || (e.metaKey && e.key === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 5. DevTools Trap (Debugger Loop)
    // If someone manages to open DevTools, it will freeze on debugger.
    // We only enable this in production to not annoy ourselves during development.
    let trapInterval: ReturnType<typeof setInterval>;
    if (import.meta.env.PROD) {
      trapInterval = setInterval(() => {
        // eslint-disable-next-line no-debugger
        debugger;
      }, 500);
    }

    // Attach Event Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      // Cleanup
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      if (trapInterval) {
        clearInterval(trapInterval);
      }
    };
  }, []);
};
