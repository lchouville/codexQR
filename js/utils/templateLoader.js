/**
 * Loads an HTML template from the specified path and appends it to the given container element.
 * @param {string} templatePath 
 * @param {HTMLElement} container 
 */
export async function loadTemplate(templatePath,container) {
    const response = await fetch(templatePath);
    if (!response.ok) {
        throw new Error('Failed to fetch template');
    }
    const html = await response.text();
    container.innerHTML += html;
    // check if css file is already loaded
    const cssPath = templatePath.replace('.tmpl', '.css');
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
        loadCSS(cssPath);
    }
    return container.lastElementChild;
}

function loadCSS(cssPath) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}