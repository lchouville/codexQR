import { initDecoder } from "./components/decoder.js";
import { loadTemplate } from "./utils/templateLoader.js";

async function main() {
    // load Page
    const decoder = await loadTemplate('assets/layouts/decoder.tmpl', document.getElementById('main-content'));
    initDecoder(decoder);
}

main();