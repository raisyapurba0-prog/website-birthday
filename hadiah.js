
const giftBox = document.getElementById("giftBox");
const openGift = document.getElementById("openGift");
const giftInstruction = document.getElementById("giftInstruction");

const coupon = document.getElementById("coupon");
const claimCoupon = document.getElementById("claimCoupon");
const confirmation = document.getElementById("confirmation");

const formLink = "https://forms.gle/zK7DwyGyWo7pS3oa8";

let giftOpened = false;
let couponUsed = false;

// MEMBUKA KOTAK HADIAH
openGift.addEventListener("click", function () {

    if (giftOpened) return;

    giftOpened = true;

    giftBox.classList.add("opened");

    giftInstruction.textContent =
        "TADAAA! ADA SESUATU BUAT BUBUB! ♡";

    openGift.textContent = "KOTAK SUDAH DIBUKA ♡";
    openGift.disabled = true;

    setTimeout(function () {
        coupon.classList.remove("hidden");
    }, 800);

});

// MENGGUNAKAN KUPON
claimCoupon.addEventListener("click", function () {

    if (couponUsed) return;

    couponUsed = true;

    coupon.classList.add("hidden");
    confirmation.classList.remove("hidden");

    giftInstruction.textContent =
        "Hehehe, kuponnya sudah digunakan!";

    window.open(formLink, "_blank");

});
