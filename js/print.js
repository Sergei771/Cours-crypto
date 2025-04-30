/**
 * Print functionality for Tearoom Shadows website
 * Handles print-specific styling and preparation
 */
document.addEventListener('DOMContentLoaded', () => {
  // Cibler le bouton d'impression/PDF
  const printButton = document.getElementById('print-button');
  
  if (printButton) {
    printButton.addEventListener('click', () => {
      console.log("Print/PDF button clicked");
      preparePrint();
    });
  }
  
  // Listen for print media query changes
  const mediaQueryList = window.matchMedia('print');
  mediaQueryList.addEventListener('change', evt => {
    if (!evt.matches) {
      // When exiting print preview, restore elements
      restoreForScreen();
    }
  });
});

/**
 * Prepares the document for printing
 */
function preparePrint() {
  console.log("Preparing document for printing/PDF via print dialog...");
  
  // Hide elements that shouldn't be printed
  const elementsToHide = document.querySelectorAll('.sidebar, .sidebar-toggle, #theme-toggle, .action-buttons, #back-to-top, header > nav'); // Cacher aussi la nav principale
  elementsToHide.forEach(el => {
    if (el) {
      // Make sure we don't overwrite existing data if called multiple times
      if (!el.hasAttribute('data-original-display')) {
        el.dataset.originalDisplay = el.style.display || '';
      }
      el.style.display = 'none';
    }
  });

  // Ensure document title is set for the print job name
  // (Already set via <title> tag)

  // Attendre un court instant pour s'assurer que les styles sont appliqués
  setTimeout(() => {
    // Ensure MathJax is fully rendered before printing
    if (window.MathJax && window.MathJax.typesetPromise) {
      console.log("Waiting for MathJax...");
      window.MathJax.typesetPromise().then(() => {
        console.log("MathJax ready, calling window.print()");
        window.print();
      }).catch(error => {
        console.error("MathJax error:", error);
        console.log("MathJax failed, calling window.print() anyway...");
        window.print(); // Try to print even if MathJax fails
      });
    } else {
      console.log("No MathJax or already rendered, calling window.print()");
      window.print();
    }
  }, 300); // 300ms delay might be adjustable
}

/**
 * Restores the document to normal viewing after print preview is closed
 */
function restoreForScreen() {
  console.log("Restoring document after print dialog...");
  
  // Restore hidden elements
  document.querySelectorAll('[data-original-display]').forEach(el => {
    el.style.display = el.dataset.originalDisplay;
    el.removeAttribute('data-original-display'); // Clean up the attribute
  });
} 