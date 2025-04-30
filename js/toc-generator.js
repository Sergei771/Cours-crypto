/**
 * Table of Contents Generator
 * Automatically creates a TOC from headings in the content
 * Populates both the desktop sidebar and the mobile navigation panel.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Find BOTH toc containers
  const desktopTocContainer = document.querySelector('.desktop-toc'); 
  const mobileTocContainer = document.querySelector('.mobile-toc');
  // We need at least one container to proceed
  if (!desktopTocContainer && !mobileTocContainer) return;

  // Find the content area to scan for headings - Modifié pour cibler le bon conteneur
  const contentArea = document.querySelector('.document-content');
  if (!contentArea) return;

  // Get all headings (h2, h3, h4) from the content
  const headings = contentArea.querySelectorAll('h2, h3, h4');
  if (headings.length === 0) return;

  // Create TOC structure - Supprimé car le titre est déjà présent dans le HTML
  // const tocTitle = document.createElement('h2');
  // tocTitle.textContent = 'Table des matières';
  // tocTitle.className = 'toc-title';
  
  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';
  
  // Track the current hierarchy level
  let currentLevel = 0;
  let listStack = [tocList];
  
  // Process each heading
  headings.forEach(heading => {
    // Add IDs to headings if they don't have one
    if (!heading.id) {
      heading.id = generateIdFromText(heading.textContent);
    }
    
    // Determine heading level (2 for h2, 3 for h3, etc.)
    const level = parseInt(heading.tagName.charAt(1));
    
    // Create list hierarchy if needed
    if (level > currentLevel) {
      // Need to go deeper in the hierarchy
      for (let i = currentLevel; i < level; i++) {
        const newList = document.createElement('ul');
        newList.className = 'toc-sublist';
        
        if (listStack[listStack.length - 1].lastElementChild) {
          listStack[listStack.length - 1].lastElementChild.appendChild(newList);
          listStack.push(newList);
        } else {
          // If there's no item to append to, create one
          const dummyItem = document.createElement('li');
          listStack[listStack.length - 1].appendChild(dummyItem);
          dummyItem.appendChild(newList);
          listStack.push(newList);
        }
      }
    } else if (level < currentLevel) {
      // Need to go up in the hierarchy
      for (let i = currentLevel; i > level; i--) {
        listStack.pop();
      }
    }
    
    currentLevel = level;
    
    // Create TOC item
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    listItem.appendChild(link);
    
    // Add to current level in the TOC
    listStack[listStack.length - 1].appendChild(listItem);
    
    // Add click event to scroll smoothly
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1); // Remove the leading '#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
      } else {
          console.error(`Element with ID '${targetId}' not found for ToC link.`);
      }
    });
  });
  
  // Only add TOC if we have items
  if (tocList.children.length > 0) {
    // Populate desktop TOC if container exists
    if (desktopTocContainer) {
        // Clone the generated list for the desktop sidebar
        desktopTocContainer.appendChild(tocList.cloneNode(true)); 
    }
    // Populate mobile TOC if container exists
    if (mobileTocContainer) {
        // Add the original list (or a clone if desktop also exists) to the mobile nav
        mobileTocContainer.appendChild(tocList); // Use the original list here
    }
    
    // Re-attach event listeners to cloned nodes if necessary (or handle globally)
    // The previous code adds listeners during generation, so clones might need re-binding
    // Let's re-attach listeners after cloning to be safe for both containers
    document.querySelectorAll('.toc-container a').forEach(tocLink => {
        // Remove potential old listener first to avoid duplicates
        // (Better would be to use named functions and remove specific listener)
        // For simplicity here, we just re-add. If issues arise, use named functions.
        
        // Check if listener already exists might be complex, re-adding is simpler for now
        // but might attach multiple times if script runs again.
        // A better approach uses a flag or checks if a listener function is already attached.

        tocLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tocLink.getAttribute('href').substring(1); // Remove the leading '#'
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Optionally close mobile nav if open
                const nav = document.querySelector('nav');
                const hamburgerMenu = document.querySelector('.hamburger-menu');
                if (nav && nav.classList.contains('open')) {
                   nav.classList.remove('open');
                   if (hamburgerMenu) hamburgerMenu.classList.remove('open');
                }
            } else {
                console.error(`Element with ID '${targetId}' not found for ToC link.`);
            }
        });
    });

  }
});

/**
 * Generates an ID from text by removing special characters and replacing spaces with dashes
 */
function generateIdFromText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
} 