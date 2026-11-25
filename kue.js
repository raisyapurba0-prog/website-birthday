
const flameTwo = document.getElementById("flameTwo");
const flameZero = document.getElementById("flameZero");

const blowButton = document.getElementById("blowButton");
const instruction = document.getElementById("instruction");
const wishMessage = document.getElementById("wishMessage");

let candleBlown = false;

function blowCandle() {
    if (candleBlown) return;

    candleBlown = true;

    // Kedua api padam bersamaan
    flameTwo.classList.add("off");
    flameZero.classList.add("off");

    // Ubah instruksi
    instruction.textContent =
        "Yeay! Semoga semua harapan baik menjadi kenyataan! ✨";

    // Ubah tombol
    blowButton.innerHTML = "HARAPAN TERKIRIM ♡";
    blowButton.disabled = true;

    // Tampilkan pesan ulang tahun
    setTimeout(() => {
        wishMessage.classList.add("show");
    }, 800);
}

blowButton.addEventListener("click", blowCandle);
