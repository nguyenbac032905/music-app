document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".upload-image-input");
    const preview = document.querySelector(".upload-image-preview");

    if (!input || !preview) return;

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) {
        preview.src = "";
        preview.style.display = "none";
        return;
        }

        // Chỉ cho phép file ảnh
        if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh");
        input.value = "";
        preview.src = "";
        preview.style.display = "none";
        return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    });
});