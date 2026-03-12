export function initDecoder(root) {

    const fileInput = root.querySelector("#qr-file");
    const result = root.querySelector("#qr-result");
    const canvas = root.querySelector("#qr-canvas");
    const ctx = canvas.getContext("2d");

    fileInput.addEventListener("change", async (event) => {

        const file = event.target.files[0];
        if (!file) return;

        const bitmap = await createImageBitmap(file);

        canvas.width = bitmap.width;
        canvas.height = bitmap.height;

        ctx.drawImage(bitmap, 0, 0);

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const code = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
        );

        if (code) {
            result.textContent = code.data;
        } else {
            result.textContent = "QR non détecté";
        }

    });

}