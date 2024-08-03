const wrapper_1 = document.querySelector(".wrapper_1");
const generateBtn = document.getElementById("generateQrCodeBtn");
const qrInput = wrapper_1.querySelector(".form input");
const qrImg = wrapper_1.querySelector("#generatedQrCode");
const copyQrCodeBtn = document.getElementById("copyQrCodeBtn");

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper_1.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        copyQrCodeBtn.style.display = "block";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper_1.classList.remove("active");
        preValue = "";
        copyQrCodeBtn.style.display = "none";
    }
});

function copyQrCode() {
    let qrCodeSrc = qrImg.src;
    navigator.clipboard.writeText(qrCodeSrc).then(() => {
        alert("QR Code copied!");
    });
}
const wrapper_2 = document.querySelector(".wrapper_2"),
    form = wrapper_2.querySelector("form"),
    fileInp = form.querySelector("input"),
    infoText = wrapper_2.querySelector("p"),
    closeBtn = wrapper_2.querySelector(".close"),
    copyBtn = wrapper_2.querySelector(".copy");

function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if (!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper_2.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code";
    });
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper_2.classList.remove("active"));
