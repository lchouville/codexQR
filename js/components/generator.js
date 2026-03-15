export async function initGenerator(root) {

    const btn = root.querySelector("#generator-btn");
    const container = root.querySelector("#generator-result");

    // load navigation for generator
    const div =  root.querySelector("#generator-type");
    // load generator types from assets/components/generator
    const path = "assets/components/generator/generator.json";
    fetch(`./${path}`)
        .then(response => response.json())
        .then(types => {
            types.forEach(type => {
                const btn = document.createElement("button");
                btn.textContent = type.toUpperCase();
                div.appendChild(btn);
                btn.addEventListener("click", async () => {
                    const formDiv = root.querySelector("#generator-form");
                    formDiv.innerHTML = "";
                    const response = await fetch(`./assets/components/generator/${type}.tmpl`);
                    if (!response.ok) {
                        throw new Error("Failed to load template");
                    }
                    const html = await response.text();
                    formDiv.innerHTML = html;
                });
            });
        });
    // default load URL generator
    const response = await fetch("./assets/components/generator/url.tmpl");
    if (!response.ok) {
        throw new Error("Failed to load template");
    }
    const html = await response.text();
    root.querySelector("#generator-form").innerHTML = html;

    let qrCode = null;

    btn.addEventListener("click", () => {
        const type = root.querySelector("#form-type").value;
        if (!type) {
            console.error("type missing");
            
            return;
        }
        const text = getFormData(root, type);

        // supprimer ancien QR
        container.innerHTML = "";

        // générer le QR code

        qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            data: text,
            dotsOptions: {
                color: "#000000",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#ffffff",
            }
        });

        qrCode.append(container);

    });

}

function getFormData(root, type) {
    switch (type) {
        case "url":
            return root.querySelector("#generator-url-text").value.trim();
        case "wifi":
            const ssid = root.querySelector("#generator-wifi-ssid").value.trim();
            const password = root.querySelector("#generator-wifi-password").value.trim();
            const encryption = root.querySelector("#generator-wifi-encryption").value.toLowerCase();
            if (!ssid) {
                throw new Error("SSID is required");
            }
            if (encryption !== "nopass" && !password) {
                throw new Error("Password is required for WPA/WPA2 and WEP encryption");
            }
            if (encryption === "nopass") {
                return `WIFI:T:nopass;S:${ssid};;`;
            }
            return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        default:
            throw new Error("Unknown generator type");
    }
}