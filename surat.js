
const openButton = document.getElementById("openLetter");
const envelopeSection = document.getElementById("envelopeSection");
const letterContent = document.getElementById("letterContent");

let isOpening = false;

openButton.addEventListener("click", function () {

    if (isOpening) return;

    isOpening = true;
    openButton.disabled = true;

    envelopeSection.classList.add("opening");

    // Memberi waktu amplop terbuka dan kertas keluar
    setTimeout(function () {

        envelopeSection.classList.add("hide");

    }, 1800);

    // Menampilkan isi surat
    setTimeout(function () {

        envelopeSection.style.display = "none";

        letterContent.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        requestAnimationFrame(function () {
            letterContent.classList.add("show");
        });

    }, 2800);

});
