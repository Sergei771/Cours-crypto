// MathJax loader script
document.addEventListener('DOMContentLoaded', function() {
    // Create a script element to load MathJax
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    
    // Set configuration before loading MathJax
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true
        },
        svg: {
            fontCache: 'global'
        },
        options: {
            renderActions: {
                addMenu: []
            }
        }
    };
    
    // Append the script to the document
    document.head.appendChild(script);
});

// Function to refresh MathJax rendering when needed
function refreshMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
    }
}