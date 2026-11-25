
const birthdayMusic = document.getElementById("birthdayMusic");

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const replayButton = document.getElementById("replayButton");

const musicDisc = document.getElementById("musicDisc");
const visualizer = document.getElementById("visualizer");
const musicPlayer = document.getElementById("musicPlayer");

const currentLyric = document.getElementById("currentLyric");
const lyricsPage = document.getElementById("lyricsPage");

/* DAFTAR LIRIK DAN WAKTU */

const lyrics = [
    { time: 0, text: "Hati siapa yang tak kecewa 💗" },
    { time: 3, text: "Atu titat titut atu tutuh tatih tayang 🎀" },
    { time: 6.5, text: "Kasih sayang darimu yang semakin menghilang 🥺" },
    { time: 10, text: "Apakah kau sudah punya penggantiku? 😚" },
    { time: 13.5, text: "Bisa-bisa aku mati karena cemburu 😤💕" },
    { time: 17, text: "Atu tium-tium atu tutuh peyuk ciyum 😘" },
    { time: 20, text: "Pelukan hangat yang tak lagi aku rasakan 🥹" },
    { time: 23, text: "Aku butuh cinta, bukan yang lainnya 🫶🏻" },
    { time: 26, text: "Kasih sayang darimu sudah cukup bagiku 💞" }
];
/* MENJALANKAN ANIMASI */

function startAnimation() {
    musicDisc.classList.add("playing");
    visualizer.classList.add("playing");
    musicPlayer.classList.add("playing");
}

/* MENGHENTIKAN ANIMASI */

function stopAnimation() {
    musicDisc.classList.remove("playing");
    visualizer.classList.remove("playing");
    musicPlayer.classList.remove("playing");
}

/* MEMPERBARUI LIRIK */

let previousLyricIndex = -1;

function updateLyrics() {
    const currentTime = birthdayMusic.currentTime;

    let activeIndex = 0;

    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time) {
            activeIndex = i;
        }
    }

    if (activeIndex !== previousLyricIndex) {
        previousLyricIndex = activeIndex;

        currentLyric.classList.remove("active");

        currentLyric.textContent = lyrics[activeIndex].text;

        lyricsPage.textContent =
            String(activeIndex + 1).padStart(2, "0") +
            " / " +
            String(lyrics.length).padStart(2, "0");

        void currentLyric.offsetWidth;

        currentLyric.classList.add("active");
    }
}

/* TOMBOL PUTAR MUSIK */

playButton.addEventListener("click", function () {
    birthdayMusic.play()
        .then(function () {
            startAnimation();
            updateLyrics();
        })
        .catch(function () {
            alert("Musik belum bisa diputar. Periksa file tatitut.mp3, ya!");
        });
});

/* TOMBOL JEDA */

pauseButton.addEventListener("click", function () {
    birthdayMusic.pause();
    stopAnimation();
});

/* TOMBOL PUTAR ULANG */

replayButton.addEventListener("click", function () {
    birthdayMusic.currentTime = 0;

    previousLyricIndex = -1;
    updateLyrics();

    birthdayMusic.play()
        .then(function () {
            startAnimation();
        })
        .catch(function () {
            alert("Musik belum bisa diputar. Periksa file tatitut.mp3, ya!");
        });
});

/* AUDIO MENGIKUTI WAKTU LAGU */

birthdayMusic.addEventListener("timeupdate", updateLyrics);

birthdayMusic.addEventListener("seeked", updateLyrics);

/* STATUS MUSIK */

birthdayMusic.addEventListener("play", startAnimation);

birthdayMusic.addEventListener("pause", stopAnimation);

/* KETIKA MUSIK SELESAI */

birthdayMusic.addEventListener("ended", function () {
    stopAnimation();

    currentLyric.classList.remove("active");

    currentLyric.textContent = "Yeay! Selesai nyanyi! 💗";

    lyricsPage.textContent = "08 / 08";

    previousLyricIndex = -1;
});
