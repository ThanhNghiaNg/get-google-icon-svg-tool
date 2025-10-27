{/* <input id="name-input" type="text">
        <input id="fill-input" type="checkbox">
        <button id="get-icon-btn">Get Icon</button>
        <button id="download-svg-btn">Download SVG</button> */}
const getGoogleIconSVGLink = (name, fill) => {
    const opts = fill ? "_fill1" : "";
    const filename = `${name + opts}_24px.svg`;
    return `https://raw.githubusercontent.com/google/material-design-icons/bb04090f930e272697f2a1f0d7b352d92dfeee43/symbols/web/${name}/materialsymbolsrounded/${filename}`;
};

const nameInput = document.getElementById("name-input");
const fillInput = document.getElementById("fill-input");
const imgEl = document.getElementById("image");
const getBtn = document.getElementById("get-icon-btn");
const downloadBtn = document.getElementById("download-svg-btn");

let currentSVG = "";
let currentName = "";

getBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    if (!name) return alert("Nhập tên icon trước!");

    const fill = fillInput.checked;
    const url = getGoogleIconSVGLink(name, fill);

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Không tìm thấy icon");
        const svgText = await res.text();
        currentSVG = svgText;
        currentName = `${name}${fill ? "_fill" : ""}.svg`;
        const blob = new Blob([svgText], { type: "image/svg+xml" });
        const blobUrl = URL.createObjectURL(blob);
        imgEl.src = blobUrl;
    } catch (err) {
        alert(err.message);
    }
});

downloadBtn.addEventListener("click", () => {
    if (!currentSVG) return alert("Chưa có icon để tải!");
    const blob = new Blob([currentSVG], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = currentName;
    a.click();
});