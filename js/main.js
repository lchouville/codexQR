import { initDecoder } from "./components/decoder.js";
import { initGenerator } from "./components/generator.js";
import { getAllTemplates, loadTemplate } from "./utils/templateLoader.js";

function initTemplate(layout, root) {
    switch (layout) {
        case 'decoder':
            initDecoder(root);
            break;

        case 'generator':
            initGenerator(root);
            break;
    }
}

async function main() {
    // load navigation
    const layouts = await getAllTemplates();
    const navLinks = document.getElementById('nav-links');
    layouts.forEach(layout => {
        const link = document.createElement('li');
        link.textContent = layout[0].toUpperCase() + layout.slice(1);
        navLinks.appendChild(link);

        link.addEventListener('click', async () => {
            // clear main content
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = '';
            // load template
            const template = await loadTemplate(`assets/layouts/${layout}.tmpl`, mainContent);
            // init component
            initTemplate(layout, template);
        });
    });
}

main();