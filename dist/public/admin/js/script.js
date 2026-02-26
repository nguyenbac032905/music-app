//preview anh
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
//preview audio
document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".upload-audio-input");
    const audio = document.querySelector(".upload-audio-play");
    const source = audio.querySelector("source");

    input.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        source.src = url;
        audio.style.display = "block";
        audio.load();
        audio.play();
    });
});